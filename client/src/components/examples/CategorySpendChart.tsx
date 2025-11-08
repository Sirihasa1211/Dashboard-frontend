import { CategorySpendChart } from '../category-spend-chart';

const mockData = [
  { category: "Operations", value: 51000 },
  { category: "Marketing", value: 37250 },
  { category: "Facilities", value: 21500 },
];

export default function CategorySpendChartExample() {
  return (
    <div className="p-8 bg-background">
      <CategorySpendChart data={mockData} />
    </div>
  );
}
