const service = require("../services/transactionService");

exports.createTransaction = async (req, res) => {
    const origin = req.user.userId;
    const { destination, amount } = req.body;

    const result = await service.createTransaction({ origin, destination, amount });

    res.status(result.status).json(result);
};

exports.getTransactions = async (req, res) => {
    const userId = req.user.userId;

    const result = await service.getTransactions(userId);

    res.json(result);
};

exports.approveTransaction = async (req, res) => {
    const result = await service.approveTransaction(req.params.id);

    res.status(result.status).json(result);
};

exports.rejectTransaction = async (req, res) => {
    const result = await service.rejectTransaction(req.params.id);

    res.status(result.status).json(result);
};