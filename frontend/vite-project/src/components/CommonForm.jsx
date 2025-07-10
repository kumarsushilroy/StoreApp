const CommonForm = ({ fields, onSubmit, buttonLabel, formHeader }) => {
  console.log("FIELDS==", fields);
  return (
    <div>
      {/* <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5 shadow-md border">
            <form onSubmit={onSubmit}>
              <h3 className="m-2 text-center">{formHeader}</h3>
              {fields?.map((field) => {
                return (
                  <div key={field.name} class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      {field.name}
                    </label>
                    {field.type == "select" ? (
                      <select onChange={field.onChange}>
                        {
                           field.option.map((item)=>{
                            return (
                                <option value={item.value}>{item.name}</option>
                            )
                           })
                        }
                       
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        class="form-control"
                      />
                    )}
                  </div>
                );
              })}

              <button type="submit" className="btn btn-primary m-2">
                { buttonLabel }
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CommonForm;
