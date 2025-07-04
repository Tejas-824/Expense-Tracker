import TransactionList from "../Transactions/TransactionList";
import TransactionChart from "../Transactions/TransactionChart";
import FilterSection from "../Transactions/FilterSection";

const Dashboard = () => {
  return (
    <div >
        <TransactionChart />
        <FilterSection />
        <TransactionList />
      </div>
  
  );
};

export default Dashboard;
