import React, { useState } from "react";
import "./DataForm.css";

// Utility to convert camelCase or PascalCase to readable format
const beautifyLabel = (str) =>
  str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/^./, (s) => s.toUpperCase());


function DataForm({ onAdd, onSuccess }) {
  const [form, setForm] = useState({
    image: "",
    applicationNo: "",
    applicationType: "",
    Name: "",
    passportNo: "",
    TRidentityNumber: "",
    MothersName: "",
    fathersName: "",
    documentValidityStartDate: "",
    documentValidityEndDate: "",
    approvalStatus: false,
    approvalDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setForm({
          applicationNo: "",
          applicationType: "",
          Name: "",
          passportNo: "",
          TRidentityNumber: "",
          MothersName: "",
          fathersName: "",
          documentValidityStartDate: "",
          documentValidityEndDate: "",
          approvalStatus: false,
          approvalDate: ""
        });

        if (onAdd) onAdd();
        if (onSuccess) onSuccess();
      } else {
        alert("❌ Failed to add data. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ An error occurred while submitting data.");
    }
  };

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              setForm({ ...form, image: reader.result });
            };
            if (file) reader.readAsDataURL(file);
          }}
        />
      </div>

      {form.image && (
        <div className="form-group">
          <label>Preview:</label>
          <img
            src={form.image}
            alt="Preview"
            style={{ maxWidth: "200px", borderRadius: "8px", marginTop: "10px" }}
          />
        </div>
      )}

      {Object.entries(form).map(([key, value]) => {
        if (key === "image") return null; // skip image here

        return (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{beautifyLabel(key)}</label>
            {typeof value === "boolean" ? (
              <input
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={handleChange}
              />
            ) : key.toLowerCase().includes("date") ? (
              <input
                type="date"
                name={key}
                id={key}
                value={value}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                type="text"
                name={key}
                id={key}
                placeholder={`Enter ${beautifyLabel(key)}`}
                value={value}
                onChange={handleChange}
                required
              />
            )}
          </div>
        );
      })}


      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
}

export default DataForm;
