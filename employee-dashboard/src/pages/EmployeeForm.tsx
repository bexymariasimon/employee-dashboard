import { useState } from "react";

function EmployeeForm() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    alert("Employee form submitted successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Employee Form
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter employee name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Designation
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter designation"
                    value={designation}
                    onChange={(event) =>
                      setDesignation(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Location
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Salary
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter salary"
                    value={salary}
                    onChange={(event) =>
                      setSalary(event.target.value)
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Submit
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;