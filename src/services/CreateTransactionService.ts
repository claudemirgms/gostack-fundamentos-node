import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transact: Transaction): Transaction {
    const transaction = new Transaction(transact);

    this.transactionsRepository.create(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
