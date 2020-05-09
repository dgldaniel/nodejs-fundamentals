import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    const transactionOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    const sumIncome = transactionIncome.reduce((acc, next) => acc + next, 0);
    const sumOutcome = transactionOutcome.reduce((acc, next) => acc + next, 0);
    const total = sumIncome - sumOutcome;

    return {
      income: sumIncome,
      outcome: sumOutcome,
      total,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
