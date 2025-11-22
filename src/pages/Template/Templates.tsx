import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { BoxButton, IcPlusLine, useTabs } from '@yourssu/design-system-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TableSearchBar from '@/components/TableSearchBar/TableSearchBar';
import { TemplateList } from '@/components/TemplateList/TemplateList';
import { deleteTemplate } from '@/query/template/mutations/deleteTemplate';
import { postTemplateFromForms } from '@/query/template/mutations/postTemplatesFromForms';
import { putTemplate } from '@/query/template/mutations/putTemplate';
import { templateKeys, templateOptions } from '@/query/template/options';
import { Template } from '@/types/template';

import { AddTemplateDialog } from './components/AddTemplateDialog/AddTemplateDialog';
import { DeleteTemplateDialog } from './components/DeleteTemplateDialog/DeleteTemplateDialog';
import { EditTemplateDialog } from './components/EditTemplateDialog/EditTemplateDialog';
import {
  StyledContainer,
  StyledSearchbar,
  StyledTabsListContainer,
  StyledTemplateList,
  StyledTitle,
} from './Templates.style';

const templateTypes = ['메일'] as const;
type TabType = (typeof templateTypes)[number];

interface TemplateFormData {
  search: string;
}

type DialogType = 'add' | 'delete' | 'edit' | null;

export const Templates = () => {
  const [Tabs] = useTabs<TabType>({
    defaultTab: templateTypes[0],
    scrollable: true,
  });

  const methods = useForm<TemplateFormData>({
    defaultValues: {
      search: '',
    },
  });

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
    onSuccess: (_data, params) => {
      const updatedPayload = params;

      queryClient.invalidateQueries({ queryKey: templateKeys.all });

      queryClient.setQueryData(templateKeys.detail(updatedPayload.id), (oldData: Template) => {
        return {
          ...(oldData || {}),
          ...updatedPayload,
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
      // console.log('삭제 기능', dialogState.selectedTemplateId);
      deleteTemplateMutation.mutate({ templateId: dialogState.selectedTemplateId });
      handleCloseDialog();
    }
  };

  // 편집 저장 로직
  const handleSaveEdit = (updatedTemplate: Omit<Template, 'date'>) => {
    // console.log('편집 저장', updatedTemplate);
    putTemplateMutation.mutate(updatedTemplate);
  };

  // 새 템플릿 저장 로직
  const handleSaveAdd = (newTemplate: Omit<Template, 'date' | 'id'>) => {
    // console.log('템플릿 추가', newTemplate);
    postTemplateMutation.mutate(newTemplate);
  };

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <StyledTitle>템플릿</StyledTitle>
        <Tabs>
          <StyledTabsListContainer>
            <Tabs.List size="large">
              {templateTypes.map((type) => (
                <Tabs.Tab id={type} key={type}>
                  {type}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </StyledTabsListContainer>
          {templateTypes.map((type) => (
            <Tabs.Panel key={type} value={type}>
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
                {templates.map((template) => (
                  <TemplateList
                    date={template.date}
                    key={template.id}
                    onClick={() => handleEditTemplate(template.id)}
                    onDelete={() => handleDeleteTemplate(template.id)}
                    title={template.title}
                  />
                ))}
              </StyledTemplateList>
            </Tabs.Panel>
          ))}
        </Tabs>
        {/* 삭제 확인 Dialog */}
        <DeleteTemplateDialog
          isOpen={dialogState.type === 'delete'}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
          templateTitle={
            templates.find((t) => t.id === dialogState.selectedTemplateId)?.title || ''
          }
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
      </StyledContainer>
    </FormProvider>
  );
};
