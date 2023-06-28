let contacts = [
  {
    id: '1',
    name: 'tayná',
    email: 'tata@gmail.com',
    phone: '3131313113',
    category_id: 1,
  },
  {
    id: '2',
    name: 'Cleber',
    email: 'tata@gmail.com',
    phone: '3131313113',
    category_id: 1,
  },
  {
    id: '3',
    name: 'Eu',
    email: 'tata@gmail.com',
    phone: '3131313113',
    category_id: 1,
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => { resolve(contacts); });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(
        contacts.find((contact) => contact.id === id),
      );
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  findByPhone(phone) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.phone !== phone);
      resolve();
    });
  }

  create({
    id, name, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id,
        name,
        phone,
        category_id,
      };
      contacts.push(newContact);
      resolve();
    });
  }

  update(id, { name, phone, category_id }) {
    return new Promise((resolve) => {
      const updetedContact = {
        id,
        name,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updetedContact : contact));

      resolve(updetedContact);
    });
  }
}

module.exports = new ContactsRepository();
