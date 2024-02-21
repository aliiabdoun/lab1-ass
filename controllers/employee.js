const employees = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employees });
};

exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  const index = employees.findIndex(employee => employee.id === id);

  if (index !== -1) {
    employees.splice(index, 1); 
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  const existingEmployee = employees.find(employee => employee.id === id);

  if (existingEmployee) {
    res.status(400).json({ message: 'Employee with the same ID already exists' });
  } else {
    const newEmployee = { id, name };
    employees.push(newEmployee);
    res.status(201).json({ message: 'Employee created successfully', data: newEmployee });
  }
};
