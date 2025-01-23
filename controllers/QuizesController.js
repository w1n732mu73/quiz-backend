module.exports = {
  get: (req, res) => {
    const quizes = [
      {
        id: 1,
        title: 'Quiz 1',
      },
      {
        id: 2,
        title: 'Quiz 2',
      }
    ];

    res.json(quizes)
  }
}