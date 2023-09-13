import "./styles.css";
import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const budgetData = [
  {
    name: "שירותים חברתיים",
    percent: 45.2,
    color: "#009688",
    details: [
      { name: "חינוך", percent: 16.4 },
      { name: "העברות לביטוח הלאומי", percent: 11.9 },
      { name: "בריאות", percent: 9.4 },
      { name: "רווחה", percent: 3.1 },
      { name: "השכלה גבוהה", percent: 2.6 },
      { name: "תעסוקה", percent: 3.5 },
      { name: "מדע, תרבות וספורט", percent: 0.5 },
      { name: "קליטת עלייה", percent: 0.4 }
    ]
  },
  {
    name: "בטחון וסדר ציבורי",
    percent: 21,
    color: "#689f38",
    details: [
      { name: "בטחון", percent: 13 },
      { name: "בטחון פנים", percent: 4.5 },
      { name: "בטחון - אחר", percent: 3.5 }
    ]
  },
  {
    name: "החזרי חוב",
    percent: 12.6,
    color: "#ef5350",
    details: [
      { name: "ריבית", percent: 9 },
      { name: "קרן - ביטוח לאומי", percent: 3.6 }
    ]
  },
  {
    name: "תשתיות",
    percent: 8.5,
    color: "#9e9e9e",
    details: [
      { name: "תחבורה", percent: 7 },
      { name: "בינוי ושיכון", percent: 1.3 },
      { name: "משק המים", percent: 0.1 },
      { name: "אנרגיה", percent: 0.1 }
    ]
  },
  {
    name: "הוצאות אחרות",
    percent: 6.2,
    color: "#ffc107",
    details: [
      { name: "גמלאות ( + עובדי מדינה פעילים)", percent: 13 },
      { name: "הוצאות שונות", percent: 1.7 }
    ]
  },
  {
    name: "משרדי מטה",
    percent: 5.3,
    color: "#ba68c8",
    details: [
      { name: "פנים ושלטון מקומי", percent: 1.7 },
      { name: "אוצר", percent: 1 },
      { name: "משפטים", percent: 0.9 },
      { name: "ראש הממשלה", percent: 0.8 },
      { name: "חוץ", percent: 0.4 },
      { name: "משרדים נוספים", percent: 0.3 },
      { name: "דת", percent: 0.2 }
    ]
  },
  {
    name: "ענפי משק",
    percent: 1.2,
    color: "#3f51b5",
    details: [
      { name: "כלכלה ותעשייה", percent: 0.6 },
      { name: "חלקאות", percent: 0.5 },
      { name: "תיירות", percent: 0.1 },
      { name: "הגנת הסביבה", percent: 0.1 }
    ]
  }
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        className="header"
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        className="amount"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`₪${value}`}</text>
      <text
        className="percentage"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${percent.toFixed(1)}%)`}
      </text>
    </g>
  );
};

const BudgetPieChart = ({ amount }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 500;

  console.log(isMobile);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    setData(
      budgetData.map((budget) => {
        return {
          ...budget,
          value: Math.round((amount * budget.percent) / 100)
        };
      })
    );
    console.log("amount changed: ", amount);
  }, [amount]);

  return (
    <div id="pie-chart-container">
      <PieChart width={isMobile ? 375 : 440} height={300}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={isMobile ? 185 : 220}
          cy={140}
          innerRadius={isMobile ? 50 : 75}
          outerRadius={isMobile ? 70 : 100}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
          onMouseDown={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>

      <div className="details-container">
        {data.length > 0 && (
          <div className="detail-header">:פירוט {data[activeIndex].name}</div>
        )}
        <div className="details">
          {data.length > 0 &&
            data[activeIndex].details.map((detail, index) => (
              <div key={index} className="detail">
                {detail.name}: ₪{Math.round((amount * detail.percent) / 100)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPieChart;
