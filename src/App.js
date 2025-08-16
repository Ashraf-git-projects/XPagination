import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data , setData] = useState([]);
  const [currentPage , setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(()=>{
    const pageData = async ()=>{
        try {     let response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
             if(!response.ok){
              throw new Error("Error getting the data");
             }
             let tData = await response.json();
             setData(tData);}
             catch (error){
              alert("failed to fetch data");
               console.error(error);
             }
    };
    pageData();
  },[]);

  //Pagination Calculations ..
  const totalPages = Math.ceil(data.length/rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex , startIndex + rowsPerPage);

  //handle buttons ..
   const handlePrevious = ()=>{
    setCurrentPage((prev)=>Math.max(prev - 1 , 1));
   }
  const handleNext = ()=>{
    setCurrentPage((prev)=>Math.min(prev + 1 , totalPages));
  };

  return (
    <div className="App">
      <div className='pagination_content' >
      <h3>Xpagination</h3>
        <table className="page_table">
  <thead>
    <tr className='table_head_row'>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
      {paginatedData.map((ele,idx)=>(
        <tr key={ele.id}>
          <td>{ele.id}</td>
          <td>{ele.name}</td>
          <td>{ele.email}</td>
          <td>{ele.role}</td>
          </tr>
      ))}
  </tbody>
</table>
<div className="button_group" >
  <button className='btns' onClick={handlePrevious} disabled={currentPage===1}>Previous</button>
  <span className='current_page'>
    {currentPage}</span>
    <span>
    /{totalPages} </span>
  <button className='btns' onClick={handleNext} disabled={currentPage===totalPages}>Next</button>
</div>
</div>
    </div>
  );
}

export default App;
