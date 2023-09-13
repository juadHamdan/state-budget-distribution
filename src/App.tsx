import "./styles.css";
import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import BudgetPieChart from "./BudgetPieChart";

const TAX_POINT_REFUND = 235;

const calcTax = (salary: number) => {
  if (salary <= 6790) return 1 / 10;
  else if (salary <= 9730) return 14 / 100;
  else if (salary <= 15620) return 1 / 5;
  else if (salary <= 21710) return 31 / 100;
  else if (salary <= 45180) return 35 / 100;
  else if (salary <= 58190) return 47 / 100;
  else return 1 / 2;
};

const calcTaxAmount = (salary: number, taxPoints: number) => {
  return salary * calcTax(salary) - TAX_POINT_REFUND * taxPoints;
};

export default function App() {
  const [salary, setSalary] = useState(12669);
  const [taxPoints, setTaxPoints] = useState(2.25);

  return (
    <div id="app-container">
      <Tabs
        isLazy={true}
        size="lg"
        className="tabs-container"
        variant="soft-rounded"
        defaultIndex={1}
      >
        <div className="input-container">
          <TabList>
            <Tab className="tab">שנתי</Tab>
            <Tab className="tab">חודשי</Tab>
          </TabList>

          <div className="typed-input-container">
            <InputGroup width={120}>
              <InputRightElement pointerEvents="none" width="max-content">
                <p className="salary-text">שכר חודשי</p>
              </InputRightElement>
              <InputLeftElement pointerEvents="none">
                <p className="nis">₪</p>
              </InputLeftElement>
              <NumberInput
                className="salary-input"
                onChange={(valueAsString: string, valueAsNumber: number) => setSalary(valueAsNumber)}
                placeholder="משכורת חודשית בשקלים"
                defaultValue={12669}
                size="lg"
                min={5571}
                max={999999}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>

            <InputGroup width={120}>
              <InputRightElement pointerEvents="none" width="max-content">
                <p className="tax-points-text">נקודות זיכוי</p>
              </InputRightElement>
              <NumberInput
                width={120}
                size="lg"
                defaultValue={taxPoints}
                onChange={(valueAsString: string, valueAsNumber: number) => setTaxPoints(valueAsNumber)}
                min={2.25}
                max={12}
                precision={2}
                step={0.25}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </div>
        </div>

        <br />
        <hr />
        <TabPanels>
          <TabPanel>
            <BudgetPieChart amount={calcTaxAmount(salary, taxPoints) * 12} />
          </TabPanel>
          <TabPanel>
            <BudgetPieChart amount={calcTaxAmount(salary, taxPoints)} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
