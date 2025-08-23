import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom"; // ✅ Corrected import

export default function Userlist() {
    const [data, Setdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [msg , setMsg] = useState("");

    useEffect(() => {
        handleApi();
    }, []); // ✅ No missing dependency warning

    async function handleDelete(id) {
        await axios.delete("http://localhost:7000/api/user/" + id);
        handleApi();
    }

    async function handleApi() {
        try{
            let url = "http://localhost:7000/api/user";
        let response = await axios.get(url);
        Setdata(response.data.data);
        }catch (error) {
            console.error("Error fetching user data:", error);
            setMsg("Failed to fetch user data. Please try again later.");
  }
    }

    // Pagination calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        msg && <div className="alert alert-danger">{msg}</div>
                    }
                    <div className="col-md-offset-1 col-md-10">
                        <div className="panel">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col col-sm-3 col-xs-12">
                                        <h4 className="title">User <span>List</span></h4>
                                    </div>
                                    <div className="col-sm-9 col-xs-12 text-right">
                                        <div className="btn_group">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <button className="btn btn-default" title="Reload"><i className="fa fa-sync-alt"></i></button>
                                            <button className="btn btn-default" title="Pdf"><i className="fa fa-file-pdf"></i></button>
                                            <button className="btn btn-default" title="Excel"><i className="fas fa-file-excel"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-body table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>firstName</th>
                                            <th>lastName</th>
                                            <th>loginId</th>
                                            <th>password</th>
                                            <th>dob</th>
                                            <th>Operation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentItems.map((ele, i) => (
                                                <tr key={ele._id}>
                                                    <td>{indexOfFirstItem + i + 1}</td>
                                                    <td>{ele.firstName}</td>
                                                    <td>{ele.lastName}</td>
                                                    <td>{ele.loginId}</td>
                                                    <td>{ele.password}</td>
                                                    <td>{ele.dob}</td>
                                                    <td>
                                                        <ul className="action-list">
                                                            <li>
                                                                <Link to={`/Useradd/${ele._id}`} data-tip="edit"><i className="fa fa-edit"></i></Link>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    onClick={() => handleDelete(ele._id)}
                                                                    className="btn btn-link"
                                                                    style={{ padding: 0 }}
                                                                >
                                                                    <i className="fa fa-trash"></i> Delete
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col col-sm-6 col-xs-6">
                                        Showing <b>{indexOfFirstItem + 1}</b> to <b>{Math.min(indexOfLastItem, data.length)}</b> of <b>{data.length}</b> entries
                                    </div>
                                    <div className="col-sm-6 col-xs-6">
                                        <ul className="pagination hidden-xs pull-right">
                                            <li>
                                                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>&lt;</button>
                                            </li>
                                            {
                                                Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                    <li key={page} className={page === currentPage ? "active" : ""}>
                                                        <button onClick={() => setCurrentPage(page)}>{page}</button>
                                                    </li>
                                                ))
                                            }
                                            <li>
                                                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>&gt;</button>
                                            </li>
                                        </ul>
                                        <ul className="pagination visible-xs pull-right">
                                            <li>
                                                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>&lt;</button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>&gt;</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
