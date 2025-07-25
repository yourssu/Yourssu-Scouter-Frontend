import TableSearchBar from '@/components/TableSearchBar/TableSearchBar';
import {
  StyledContainer,
  StyledSearchbar,
  StyledTabsListContainer,
  StyledTemplateList,
  StyledTitle,
} from './Templates.style';
import { BoxButton, IcPlusLine, useTabs } from '@yourssu/design-system-react';
import { useForm, FormProvider } from 'react-hook-form';
import { TemplateList } from '@/components/TemplateList/TemplateList';

const templateTypes = ['메일'] as const;
type TabType = (typeof templateTypes)[number];

interface TemplateFormData {
  search: string;
}

const mock = [
  {
    id: 1,
    title: '[1차 서류 합격 메일]',
    date: '2024.12.12에 수정됨',
  },
  {
    id: 2,
    title: '[1차 서류 불합격 메일]',
    date: '2024.12.12에 수정됨',
  },
  {
    id: 3,
    title: '[최종 합격 메일]',
    date: '2024.12.12에 수정됨',
  },
  {
    id: 4,
    title: '[최종 불합격 메일]',
    date: '2024.12.12에 수정됨',
  },
];

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

  const handleDeleteTemplate = (id: number) => {
    console.log('삭제 기능', id);
  };

  const handleTemplateClick = (id: number) => {
    console.log('수정 기능', id);
  };

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <StyledTitle>템플릿</StyledTitle>
        <Tabs>
          <StyledTabsListContainer>
            <Tabs.List size="large">
              {templateTypes.map((type) => (
                <Tabs.Tab key={type} id={type}>
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
                  size="medium"
                  variant="filledPrimary"
                  leftIcon={<IcPlusLine />}
                >
                  새 템플릿
                </BoxButton>
              </StyledSearchbar>
              <StyledTemplateList>
                {mock.map((template) => (
                  <TemplateList
                    key={template.id}
                    title={template.title}
                    date={template.date}
                    onClick={() => handleTemplateClick(template.id)}
                    onDelete={() => handleDeleteTemplate(template.id)}
                  />
                ))}
              </StyledTemplateList>
            </Tabs.Panel>
          ))}
        </Tabs>
      </StyledContainer>
    </FormProvider>
  );
};
