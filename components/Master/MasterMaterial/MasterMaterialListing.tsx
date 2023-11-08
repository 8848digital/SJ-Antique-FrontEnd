import React from 'react';

const MasterMaterialListing = ({ materialList }: any) => {
  console.log(materialList, 'master ,material');
  return (
    <div>
      <div className="mx-4">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Enter Material Name"
        />
      </div>
      <div className="table-responsive border p-3 mt-2">
        <table className="table table-hover table-striped w-100 ">
          <thead>
            <tr className="table_row">
              <th className="thead text-start">Material Name</th>
              <th className="thead text-start">Material Abbrevation</th>
            </tr>
          </thead>
          <tbody>
            {materialList?.map((item: any, i: any) => (
              <tr key={i} className="">
                <td className="table-body-row">{item.material}</td>
                <td className="table-body-row">{item.material_abbr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterMaterialListing;
