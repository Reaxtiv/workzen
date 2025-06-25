import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import Layout from "../components/Layout";
import PieChart from "../components/PieChart";

const testData = [
  { name: "Excellent", value: 3 },
  { name: "Good", value: 1 },
  { name: "Improving", value: 1 },
  { name: "Needs Focus", value: 1 }
];

export default function TestChartsPage() {
  return (
    <Layout>
      <Box p={8}>
        <Heading mb={6}>Test Pie Charts</Heading>
        
        <SimpleGrid columns={[1, 2, 4]} spacing={6}>
          <Box h="380px" border="1px solid red">
            <PieChart 
              data={testData}
              title="Test Chart 1"
              size="sm"
            />
          </Box>
          
          <Box h="380px" border="1px solid blue">
            <PieChart 
              data={[
                { name: "Focus Time", value: 6.1 },
                { name: "Rest Time", value: 0.8 },
                { name: "Distracted Time", value: 0.4 }
              ]}
              title="Test Chart 2"
              size="sm"
            />
          </Box>
          
          <Box h="380px" border="1px solid green">
            <PieChart 
              data={[
                { name: "Masters", value: 1 },
                { name: "Achievers", value: 2 },
                { name: "Flow", value: 2 },
                { name: "Growing", value: 1 }
              ]}
              title="Test Chart 3"
              size="sm"
            />
          </Box>
          
          <Box h="380px" border="1px solid orange">
            <PieChart 
              data={[
                { name: "High", value: 1 },
                { name: "Good", value: 2 },
                { name: "Average", value: 2 },
                { name: "Low", value: 1 }
              ]}
              title="Test Chart 4"
              size="sm"
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Layout>
  );
}
