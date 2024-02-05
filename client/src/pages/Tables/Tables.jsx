import Breadcrumb from "../../components/UI/Breadcrumb";
import TableOne from "../../components/UI/TableOne";
import TableThree from "../../components/UI/TableThree";
import TableTwo from "../../components/UI/TableTwo";

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
