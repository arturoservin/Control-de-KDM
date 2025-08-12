
  const table = document.getElementById('dataTable');
  const inputFiltro = document.getElementById('filtroPelicula');
  let rows = [];

  fetch('seguimiento de kdm.csv')
    .then(response => response.text())
    .then(csv => {
      rows = csv.trim().split('\n').map(row => row.split(','));
      renderTable(rows);
    })
    .catch(error => {
      console.error('Error al cargar el CSV:', error);
      table.innerHTML = '<tr><td colspan="7">No se pudo cargar el archivo CSV.</td></tr>';
    });

  function renderTable(data) {
  const today = new Date();
  table.innerHTML = '';

  // Encabezados
  const headerRow = document.createElement('tr');
  rows[0].forEach(header => {
    const th = document.createElement('th');
    th.textContent = header.trim();
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Solo los últimos 50 registros (excluyendo encabezado)
  const registros = data.slice(1); // sin encabezado
  const ultimos = registros.slice(-50); // últimos 50
  const datosFiltrados = [rows[0], ...ultimos]; // volver a incluir encabezado

  // Filas
  for (let i = 1; i < datosFiltrados.length; i++) {
    const tr = document.createElement('tr');
    datosFiltrados[i].forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell.trim();
      tr.appendChild(td);
    });

    const fechaCierreStr = datosFiltrados[i][3].trim();
    const fechaCierre = new Date(fechaCierreStr);
    if (fechaCierre < today) {
      tr.style.backgroundColor = '#f8d7da';
    }

    table.appendChild(tr);
  }
}


  inputFiltro.addEventListener('input', () => {
    const filtro = inputFiltro.value.toLowerCase();
    const filtradas = rows.filter((row, index) => {
      if (index === 0) return true; // encabezado
      return row[0].toLowerCase().includes(filtro); // columna Película
    });
    renderTable(filtradas);
  });

