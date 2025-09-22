const animals = [];

export const createAnimal = (req, res) => {
  const { nome, especie, raca, idade, dono } = req.body;

  if (!nome || !especie || !dono) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios: nome, especie, dono' });
  }

  const novoAnimal = {
    id: animals.length + 1,
    nome,
    especie,
    raca: raca || '',
    idade: idade || null,
    dono
  };

  animals.push(novoAnimal);
  res.status(201).json(novoAnimal);
};

export const listAnimals = (req, res) => {
  res.json(animals);
};
