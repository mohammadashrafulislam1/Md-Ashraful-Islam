

const EditProject = ({ projectId }) => {
  console.log(projectId)

  return (
    <div className="modal-box w-11/12 max-w-5xl">
      <h3 className="font-bold text-lg">Edit Project</h3>
      <form>
        <div>
          <label>Title:</label>
          <input type="text"/>
        </div>
        {/* Add other fields for project details */}
        <button type="submit" className="btn btn-primary">Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
