import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dialog from "../base/dialog";

export default function Todolist() {
  const [inputValue, setInputValue] = useState(""); // State lấy giá trị từ input
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState(() => {
    const jobLocal = JSON.parse(localStorage.getItem("jobs")) || [];

    return jobLocal;
  });
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [baseId, setBaseId] = useState(null);
  const [type, setType] = useState("add");

  /**
   * Validate dữ liệu đầu vào
   * @param {*} value Giá trị cần được kiểm tra
   * Auth: NVQUY (26/11/2024)
   */
  const validateData = (value) => {
    if (!value) {
      setError("Tên công việc không được để trống");
    } else {
      setError("");
    }
  };

  /**
   * Reset lỗi sau khi blur ra khỏi input
   * Auth: NVQUY (26/11/2024)
   */
  const handleResetError = () => {
    setError("");
  };

  /**
   * Hàm lấy giá trị trong input
   * @param {*} e Thông tin sự kiện
   * Auth: NVQUY (26/11/2024)
   */
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);

    validateData(e.target.value);
  };

  /**
   * Thêm mới công việc
   * @param {*} e Thông tin sự kiện
   * Auth: NVQUY (26/11/2024)
   */
  const handleSubmit = (e) => {
    // Ngăn chặn sự kiện mặc định của Form
    e.preventDefault();

    // Validate dữ liệu đầu vào
    validateData(inputValue);

    if (inputValue) {
      // Kiểm tra trùng tên công việc
      const findJob = jobs.find(
        (job) => job.name === inputValue && job.id !== baseId
      );

      if (findJob) {
        // Hiển thị thông báo check trùng
        setError("Công việc bị trùng");
      } else {
        if (type === "add") {
          // Submit form
          const newJob = {
            id: uuidv4(),
            name: inputValue,
            status: false,
          };

          //   Mở rộng mảng bằng spread operator
          const updateJobs = [...jobs, newJob];

          //  Lưu dữ liệu lên local
          localStorage.setItem("jobs", JSON.stringify(updateJobs));

          //   Cập nhật lại state để giao diện được re-render
          setJobs(updateJobs);

          // Clear giá trị trong input
          setInputValue("");
        } else {
          // Cập nhật lại thông tin công việc theo id
          const updatedJobs = jobs.map((job) => {
            // if (job.id === baseId) {
            //   return { ...job, name: inputValue };
            // } else {
            //   return job;
            // }

            return job.id === baseId ? { ...job, name: inputValue } : job;
          });

          //  Lưu dữ liệu lên local
          localStorage.setItem("jobs", JSON.stringify(updatedJobs));

          //   Cập nhật lại state để giao diện được re-render
          setJobs(updatedJobs);

          // Clear giá trị trong input
          setInputValue("");

          // Cập nhật lại type
          setType("add");

          setBaseId(null);
        }
      }
    }
  };

  /**
   * Cập nhật lại trạng thái công việc
   * @param {*} id Id của công việc cần cập nhật
   * Auth: NVQUY (26/11/2024)
   */
  const handleUpdateStatus = (id) => {
    // Tìm kiếm vị trí của công việc trong mảng
    const findIndexJob = jobs.findIndex((job) => job.id === id);

    if (findIndexJob !== -1) {
      // Cập nhật lại trạng thái của công việc
      jobs[findIndexJob].status = !jobs[findIndexJob].status;

      //   Mở rộng mảng bằng spread operator
      const updateJobs = [...jobs];

      //  Lưu dữ liệu lên local
      localStorage.setItem("jobs", JSON.stringify(updateJobs));

      //   Cập nhật lại state để giao diện được re-render
      setJobs(updateJobs);
    }
  };

  // Hàm mở dialog xác nhận xóa
  const handleShowDialog = (id) => {
    setIsShowDialog(true);

    setBaseId(id);
  };

  // Hàm mở dialog xác nhận xóa
  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };

  // Hàm xác nhận xóa công việc
  const handleConfirmDelete = () => {
    // Lọc ra mảng mới có id khác với id cần xóa
    const filterJobs = jobs.filter((job) => job.id !== baseId);

    //  Lưu dữ liệu lên local
    localStorage.setItem("jobs", JSON.stringify(filterJobs));

    //   Cập nhật lại state để giao diện được re-render
    setJobs(filterJobs);

    // Đóng dialog
    handleCloseDialog();

    // Cập nhật lại baseId
    setBaseId(null);
  };

  const handleGetIdUpdate = (job) => {
    setInputValue(job.name);

    setBaseId(job.id);

    setType("update");
  };

  return (
    <>
      {/* Dialog xác nhận xóa */}
      <Dialog
        onOK={handleConfirmDelete}
        onCancel={handleCloseDialog}
        open={isShowDialog}
        title={"Xác nhận"}
        content={"Bạn có muốn xóa công việc này không?"}
        cancelText={"Hủy"}
        okText={"Xóa"}
      />

      <div
        style={{ height: "100vh" }}
        className="container d-flex align-items-center justify-content-center"
      >
        <div style={{ width: "70%" }}>
          <form className="d-flex gap-2 mb-2" onSubmit={handleSubmit}>
            <input
              value={inputValue}
              onBlur={handleResetError}
              onChange={handleChangeInput}
              type="text"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">
              {type === "add" ? "Thêm" : "Lưu"}
            </button>
          </form>
          {error && <p className="text-error">{error}</p>}

          <ul className="list-group">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <div className="form-check">
                  <input
                    onChange={() => handleUpdateStatus(job.id)}
                    className="form-check-input"
                    type="checkbox"
                    checked={job.status}
                    id={`job-${job.id}`}
                  />
                  <label className="form-check-label" htmlFor={`job-${job.id}`}>
                    {job.status ? <s>{job.name}</s> : <p>{job.name}</p>}
                  </label>
                </div>
                <div className="d-flex gap-1">
                  <button
                    onClick={() => handleGetIdUpdate(job)}
                    className="btn btn-warning"
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDialog(job.id)}
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
