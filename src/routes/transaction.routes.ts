import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const resut = {
      transactions,
      balance,
    };
    response.json(resut);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const transaction = createTransactionService.execute(request.body);
    if (transaction.type === 'outcome') {
      const balance = transactionsRepository.getBalance();
      if (transaction.value > balance.total) {
        return response.status(400).send({ error: 'Saldo Insuficiente' });
      }
    }
    // transactionsRepository.create(request.body);
    response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
