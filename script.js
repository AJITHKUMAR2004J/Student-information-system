const form = document.getElementById('student-form');
const tableBody = document.getElementById('student-table');
let students = JSON.parse(localStorage.getItem('students')||'[]');

function render() {
  tableBody.innerHTML = '';
  students.forEach((s,i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.roll}</td>
      <td>
        <button class="action-btn" onclick="edit(${i})">Edit</button>
        <button class="action-btn" onclick="remove(${i})">Delete</button>
      </td>`;
    tableBody.appendChild(tr);
  });
  localStorage.setItem('students', JSON.stringify(students));
}

function edit(i) {
  document.getElementById('name').value = students[i].name;
  document.getElementById('roll').value = students[i].roll;
  form.dataset.editing = i;
}

function remove(i) {
  students.splice(i,1);
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const roll = form.roll.value.trim();
  if(form.dataset.editing != null){
    students[form.dataset.editing] = { name, roll };
    delete form.dataset.editing;
  } else {
    students.push({ name, roll });
  }
  form.reset();
  render();
});

render();
