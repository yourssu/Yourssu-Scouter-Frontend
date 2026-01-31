import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { BoxButton, IcPlusLine } from '@yourssu/design-system-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TableSearchBar from '@/components/TableSearchBar/TableSearchBar';
import { TemplateList } from '@/components/TemplateList/TemplateList';
import { AddTemplateDialog } from '@/pages/Template/components/AddTemplateDialog/AddTemplateDialog';
import { DeleteTemplateDialog } from '@/pages/Template/components/DeleteTemplateDialog/DeleteTemplateDialog';
import { EditTemplateDialog } from '@/pages/Template/components/EditTemplateDialog/EditTemplateDialog';
import { StyledSearchbar, StyledTemplateList } from '@/pages/Template/Templates.style';
import { deleteTemplate } from '@/query/template/mutations/deleteTemplate';
import { postTemplateFromForms } from '@/query/template/mutations/postTemplatesFromForms';
import { putTemplate } from '@/query/template/mutations/putTemplate';
import { templateKeys, templateOptions } from '@/query/template/options';
import { Template } from '@/types/template';
import { formatTemplates } from '@/utils/date';

type DialogType = 'add' | 'delete' | 'edit' | null;

export const TemplateTab = () => {
  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });
  const { watch } = methods;
  const searchValue = watch('search');

  // 통합 Dialog 상태 관리
  const [dialogState, setDialogState] = useState<{
    selectedTemplateId: number | undefined;
    type: DialogType;
  }>({
    type: null,
    selectedTemplateId: undefined,
  });

  const queryClient = useQueryClient();
  const { data: templates } = useSuspenseQuery(templateOptions.all());

  const postTemplateMutation = useMutation({
    mutationFn: postTemplateFromForms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.all });
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.all });
    },
  });

  const putTemplateMutation = useMutation({
    mutationFn: putTemplate,
    onSuccess: (data, params) => {
      const updatedPayload = params;

      // 템플릿 리스트 갱신
      queryClient.invalidateQueries({ queryKey: templateKeys.all });

      // 템플릿 상세 데이터 갱신
      queryClient.setQueryData(templateKeys.detail(updatedPayload.id), (oldData: Template) => {
        if (!oldData) {
          return;
        }

        return {
          ...oldData,
          date: data.updatedAt,
          title: updatedPayload.title,
          content: updatedPayload.content,
          variables: updatedPayload.variables,
        };
      });
    },
  });

  // 삭제 Dialog 열기
  const handleDeleteTemplate = (id: number) => {
    const template = templates.find((t) => t.id === id);
    if (template) {
      setDialogState({
        type: 'delete',
        selectedTemplateId: template.id,
      });
    }
  };

  // 편집 Dialog 열기
  const handleEditTemplate = (id: number) => {
    const template = templates.find((t) => t.id === id);
    if (template) {
      setDialogState({
        type: 'edit',
        selectedTemplateId: template.id,
      });
    }
  };

  // 새 템플릿 추가 Dialog 열기
  const handleAddTemplate = () => {
    setDialogState({
      type: 'add',
      selectedTemplateId: undefined, // 새로 만들 때는 null
    });
  };

  // Dialog 닫기
  const handleCloseDialog = () => {
    setDialogState({
      type: null,
      selectedTemplateId: undefined,
    });
  };

  // 실제 삭제 로직
  const handleConfirmDelete = () => {
    if (dialogState.selectedTemplateId) {
      deleteTemplateMutation.mutate({ templateId: dialogState.selectedTemplateId });
      handleCloseDialog();
    }
  };

  // 편집 저장 로직
  const handleSaveEdit = (updatedTemplate: Omit<Template, 'date'>) => {
    putTemplateMutation.mutate(updatedTemplate);
  };

  // 새 템플릿 저장 로직
  const handleSaveAdd = (newTemplate: Omit<Template, 'date' | 'id'>) => {
    postTemplateMutation.mutate(newTemplate);
  };

  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <FormProvider {...methods}>
      <StyledSearchbar>
        <TableSearchBar placeholder="제목으로 검색" />
        <BoxButton
          leftIcon={<IcPlusLine />}
          onClick={handleAddTemplate}
          size="medium"
          variant="filledPrimary"
        >
          새 템플릿
        </BoxButton>
      </StyledSearchbar>
      <StyledTemplateList>
        {filteredTemplates.map((template) => (
          <TemplateList
            date={formatTemplates['2025.01.01'](template.date)}
            key={template.id}
            onClick={() => handleEditTemplate(template.id)}
            onDelete={() => handleDeleteTemplate(template.id)}
            title={template.title}
          />
        ))}
      </StyledTemplateList>
      {/* 삭제 확인 Dialog */}
      <DeleteTemplateDialog
        isOpen={dialogState.type === 'delete'}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        templateTitle={templates.find((t) => t.id === dialogState.selectedTemplateId)?.title || ''}
      />
      {/* 편집 Dialog */}
      {!!dialogState.selectedTemplateId && (
        <EditTemplateDialog
          isOpen={dialogState.type === 'edit'}
          onClose={handleCloseDialog}
          onSave={handleSaveEdit}
          templateId={dialogState.selectedTemplateId}
        />
      )}
      {/* 추가 Dialog */}
      <AddTemplateDialog
        isOpen={dialogState.type === 'add'}
        onClose={handleCloseDialog}
        onSave={handleSaveAdd}
      />
    </FormProvider>
  );
};
