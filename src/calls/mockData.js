const data = [
    {
      id: '1',
      name: 'Nákupní seznam 1',
      items: [
        { id: 'item1', name: 'Mléko'},
        { id: 'item2', name: 'Chléb'},
        // ... další položky
      ],
    },
    {
      id: '2',
      name: 'Nákupní seznam 2',
      items: [
        { id: 'item3', name: 'Voda'},
        { id: 'item4', name: 'Ovoce'},
        // ... další položky
      ],
    },
    // ... další nákupní seznamy
  ];
  
export default data;

export const updateMockData = (id, newData) => {
    const index = data.findIndex(item => item.id === id);
  
    if (index !== -1) {
      // Aktualizovat existující data na základě nových dat
      data[index] = { ...data[index], ...newData };
    } else {
      // Přidat nová data, pokud neexistuje záznam se zadaným id
      data.push(newData);
    }
  };

