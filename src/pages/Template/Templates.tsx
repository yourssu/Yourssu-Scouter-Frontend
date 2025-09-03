import { BoxButton, IcPlusLine, useTabs } from '@yourssu/design-system-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TableSearchBar from '@/components/TableSearchBar/TableSearchBar';
import { TemplateList } from '@/components/TemplateList/TemplateList';

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

interface Template {
  content?: string; // 편집에 필요한 추가 데이터
  date: string;
  id: number;
  title: string;
}

const convertEnterToBr = (text: string) => {
  return text.replace(/\n/g, '<br />');
};

const mock: Template[] = [
  {
    id: 1,
    title: '[1차 서류 합격 메일]',
    date: '2024.12.12에 수정됨',
    content:
      convertEnterToBr(`안녕하세요, 김솔미 님, 유어슈 Product Design 팀 리크루팅 담당자 🙋 파트 담당자 입니다😊
   
   우선, 유어슈 Product Design 팀에 지원해주셔서 감사드립니다.
   
   지원자 김솔미 님께서 제출해 주신 서류를 검토한 결과, 김솔미 님의 역량을 더 자세히 알아보기 위해 과제와 면접 과정을 진행하기로 결정하였습니다.
   
   다음은 면접 진행에 대한 안내입니다. 면접 전 해당 내용을 반드시 숙지해 주시기 바랍니다.
   
   <면접 날짜 및 시간>
   
   김솔미 님의 면접은 📅면접 일시 에 진행될 예정이며 면접 진행 시간은 최소 ⏰최소 시간 에서 최대 ⏰최대 시간 이 걸릴 것으로 예상하고 있습니다. 가능 여부를 이메일로 꼭 회신해주시길 바랍니다.
   
   <면접 진행>
   
   면접은 유어슈 동아리방(학생회관 244호) 혹은 진리관 등의 학교 내 건물에서 오프라인으로 진행됩니다. 확정된 장소는 면접일 하루 전까지, 메일을 통해 안내드릴 예정이니 면접 전 장소를 확인해주시길 바랍니다.
   
   <면접 당일 유의할 점>
   
   면접을 진행하기로 한 시간에 부재하시는 경우, 확인을 위해 서류에 작성해주신 연락처로 연락을 드릴 수 있음을 양해 부탁드립니다.
   
   <구성>
   
   면접의 경우,
   - 서류에 작성해주신 내용에 대한 질문
   - {{식시얼, -지식에 대한 질문 등}}
   
   으로 구성이 될 예정이며, 상황에 따라 일부 가격이 있을 수 있음을 참고 바랍니다.`),
  },
  {
    id: 2,
    title: '[1차 서류 불합격 메일]',
    date: '2024.12.12에 수정됨',
    content: '안녕하세요. 1차 서류 전형 결과를 안내드립니다...',
  },
  {
    id: 3,
    title: '[최종 합격 메일]',
    date: '2024.12.12에 수정됨',
    content: '최종 합격을 진심으로 축하드립니다...',
  },
  {
    id: 4,
    title: '[최종 불합격 메일]',
    date: '2024.12.12에 수정됨',
    content: '최종 전형 결과를 안내드립니다...',
  },
];

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
    selectedTemplate: null | Template;
    type: DialogType;
  }>({
    type: null,
    selectedTemplate: null,
  });

  // 삭제 Dialog 열기
  const handleDeleteTemplate = (id: number) => {
    const template = mock.find((t) => t.id === id);
    if (template) {
      setDialogState({
        type: 'delete',
        selectedTemplate: template,
      });
    }
  };

  // 편집 Dialog 열기
  const handleEditTemplate = (id: number) => {
    const template = mock.find((t) => t.id === id);
    if (template) {
      setDialogState({
        type: 'edit',
        selectedTemplate: template,
      });
    }
  };

  // 새 템플릿 추가 Dialog 열기
  const handleAddTemplate = () => {
    setDialogState({
      type: 'add',
      selectedTemplate: null, // 새로 만들 때는 null
    });
  };

  // Dialog 닫기
  const handleCloseDialog = () => {
    setDialogState({
      type: null,
      selectedTemplate: null,
    });
  };

  // 실제 삭제 로직
  const handleConfirmDelete = () => {
    if (dialogState.selectedTemplate) {
      console.log('삭제 기능', dialogState.selectedTemplate.id);
      // TODO: 실제 삭제 API 호출
    }
  };

  // 편집 저장 로직
  const handleSaveEdit = (updatedTemplate: Template) => {
    console.log('편집 저장', updatedTemplate);
    // TODO: 실제 업데이트 API 호출
  };

  // 새 템플릿 저장 로직
  const handleSaveAdd = (newTemplate: Omit<Template, 'date' | 'id'>) => {
    console.log('템플릿 추가', newTemplate);
    // TODO: 실제 추가 API 호출
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
                {mock.map((template) => (
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
          templateTitle={dialogState.selectedTemplate?.title || ''}
        />

        {/* 편집 Dialog */}
        <EditTemplateDialog
          isOpen={dialogState.type === 'edit'}
          onClose={handleCloseDialog}
          onSave={handleSaveEdit}
          template={dialogState.selectedTemplate}
        />

        {/* 편집 Dialog */}
        <AddTemplateDialog
          isOpen={dialogState.type === 'add'}
          onClose={handleCloseDialog}
          onSave={handleSaveAdd} // 수정!
        />
      </StyledContainer>
    </FormProvider>
  );
};
