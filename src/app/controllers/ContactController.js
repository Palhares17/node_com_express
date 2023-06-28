const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Lista todos os registros
    const contacts = await ContactsRepository.findAll();

    return response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    return response.json(contact);
  }

  async store(request, response) {
    // criar um registro
    const {
      id, name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ name: 'Precisa botar nome' });
    }

    const contactExists = await ContactsRepository.findByPhone(phone);

    if (contactExists) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    const contact = await ContactsRepository.create({
      id, name, phone, category_id,
    });

    response.send(contact);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!name) {
      return response.status(400).json({ name: 'Precisa botar nome' });
    }

    const contactByPhone = await ContactsRepository.findByEmail(email);
    if (contactByPhone && contactByPhone.id !== id) {
      return response.status(400).json({ phone: 'Numero de telefone já está sendo usado' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    await ContactsRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
