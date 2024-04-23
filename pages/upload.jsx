import { useState, useEffect } from "react";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止表單的默認提交行為

    if (!selectedFile) {
      alert("請選擇一個文件！");
      return;
    }

    const formData = new FormData();
    formData.append('articleImage', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        // 不設置'Content-Type'頭部，讓瀏覽器自動設置
      });

      if (!response.ok) {
        throw new Error('文件上傳失敗！');
      }

      const data = await response.json();
      alert("文件上傳成功！");
      console.log(data); // 可以在這裡處理回傳的數據
    } catch (error) {
      console.error("上傳錯誤：", error);
      alert(error.message);
    }
  };

  return (
    <div className="container py-5">
      <h1>測試 api/upload 的表單</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <input
            className="form-control"
            type="file"
            name="articleImage"
            id="articleImage"
            onChange={handleFileChange}
          />
        </div>
        <div className="input-group">
          <button type="submit" className="btn btn-primary ms-auto">送出</button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
