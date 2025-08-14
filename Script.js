
  async function cargarRegistros() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Debes iniciar sesión');
      return;
    }

    const { data, error } = await supabase
      .from('kdms')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error al cargar registros:', error.message);
      return;
    }

    const tbody = document.querySelector('#tablaKDMs tbody');
    tbody.innerHTML = ''; // Limpiar tabla

    data.forEach(registro => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${registro.pelicula}</td>
        <td>${registro['CPL recibid'] ? '✅' : '❌'}</td>
        <td>${registro['Fecha de cp'] || ''}</td>
        <td>${registro['KDM recibic'] ? '✅' : '❌'}</td>
        <td>${registro['KDM ingest'] ? '✅' : '❌'}</td>
        <td>${registro['KDM abre'] || ''}</td>
        <td>${registro['KDM cierra'] || ''}</td>
        <td>${registro['Formatos y'] || ''}</td>
        <td>${registro['Distribuidor'] || ''}</td>
      `;
      tbody.appendChild(fila);
    });
  }

  // Llamar al cargar la página
  cargarRegistros();

