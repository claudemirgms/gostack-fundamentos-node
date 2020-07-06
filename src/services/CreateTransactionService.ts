import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(request: Transaction): Transaction {
    if (request.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (request.value > balance.total) {
        throw Error('Saldo Insuficiente');
      }
    }
    const transaction = new Transaction(request);

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
