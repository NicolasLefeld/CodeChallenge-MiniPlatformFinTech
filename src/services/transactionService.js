const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.createTransaction = async ({ origin, destination, amount }) => {
    if (origin === destination) return { status: 400, error: "Same user" };

    const from = await User.findByPk(origin);
    const to = await User.findByPk(destination);

    if (!from || !to) return { status: 404, error: "User not found" };
    
    if (from.balance < amount) return { status: 400, error: "Insufficient funds" };

    const status = amount > 50000 ? "pending" : "confirmed";
    const date = new Date();

    if (status === "confirmed") {
        await from.update({ balance: from.balance - amount });
        await to.update({ balance: to.balance + amount });
    }

    const transaction = await Transaction.create({ origin, destination, amount, status, date });
    return { status: 201, transaction };
};

exports.getTransactions = async (userId) => {
    return await Transaction.findAll({
        where: {
            [require("sequelize").Op.or]: [{ origin: userId }, { destination: userId }]
        },
        order: [["date", "DESC"]]
    });
};

exports.approveTransaction = async (id) => {
    const tx = await Transaction.findByPk(id);
    if (!tx || tx.status !== "pending") return { status: 400, error: "Invalid transaction" };

    const from = await User.findByPk(tx.origin);
    const to = await User.findByPk(tx.destination);
    if (from.balance < tx.amount) return { status: 400, error: "Insufficient funds" };

    await from.update({ balance: from.balance - tx.amount });
    await to.update({ balance: to.balance + tx.amount });
    await tx.update({ status: "confirmed" });

    return { status: 200, tx };
};

exports.rejectTransaction = async (id) => {
    const tx = await Transaction.findByPk(id);
    if (!tx || tx.status !== "pending") return { status: 400, error: "Invalid transaction" };
    await tx.update({ status: "rejected" });
    return { status: 200, tx };
};