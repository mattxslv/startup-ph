import { NavHeaderTitle } from 'components';
import { DatasetList } from 'features/cms-dataset';
import AssessmentTagList from 'features/cms-assessment-tags/components/AssessmentTagList';
import PageContainer from 'layouts/PageContainer';
import {
  Card,
  TabItem,
  TabNav,
  TabPanel,
  TabProvider,
  Title,
} from 'ui/components';

type Props = {};

function DatasetRoutes({}: Props) {
  return (
    <TabProvider id="dataset" defaultTab="agency">
      <NavHeaderTitle>
        <Title>Datasets</Title>
      </NavHeaderTitle>
      <PageContainer>
        <div className="px-4">
          <TabNav>
            <TabItem id="agency" label="Agency" />
            <TabItem id="social-classification" label="Social Classification" />
            <TabItem id="interest" label="Interest" />
            <TabItem id="sector" label="Sector" />
            <TabItem id="development-phase" label="Development Phase" />
            <TabItem
              id="business-classification"
              label="Business Classification"
            />
            <TabItem id="program-type" label="Program Type" />
            <TabItem id="news-tags" label="News Tags" />
            <TabItem id="resources-tags" label="Resources Tags" />
            {/* <TabItem id='assessment-tags' label='Assessment Tags' /> */}
          </TabNav>
        </div>
        <Card className="flex-1 flex flex-col">
          <TabPanel id="agency">
            <DatasetList key="agency" code="agency" label="Agency" />
          </TabPanel>
          <TabPanel id="social-classification">
            <DatasetList
              key="social-classification"
              code="social-classification"
              label="Social Classification"
            />
          </TabPanel>
          <TabPanel id="interest">
            <DatasetList key="interest" code="interest" label="Interest" />
          </TabPanel>
          <TabPanel id="sector">
            <DatasetList key="sector" code="sector" label="Sector" />
          </TabPanel>
          <TabPanel id="development-phase">
            <DatasetList
              key="development-phase"
              code="development-phase"
              label="Development Phase"
            />
          </TabPanel>
          <TabPanel id="business-classification">
            <DatasetList
              key="business-classification"
              code="business-classification"
              label="Business Classification"
            />
          </TabPanel>
          <TabPanel id="program-type">
            <DatasetList
              key="program-type"
              code="program-type"
              label="Program Type"
            />
          </TabPanel>
          <TabPanel id="news-tags">
            <DatasetList
              key="news-tags"
              code="news-tags"
              label="News Category"
            />
          </TabPanel>
          <TabPanel id="resources-tags">
            <DatasetList
              key="resources-tags"
              code="resources-tags"
              label="Resources Category"
            />
          </TabPanel>
          {/* <TabPanel id='assessment-tags'>
            <AssessmentTagList />
          </TabPanel> */}
        </Card>
      </PageContainer>
    </TabProvider>
  );
}

export default DatasetRoutes;
