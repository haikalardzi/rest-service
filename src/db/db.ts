import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: 'db-rest-service',
    user: 'root',
    password: 'admin',
    database: 'saranghaengbok_rest'
}).promise();

export async function getUser(username: string) {
    const rows: any[] = await pool.query(`
    SELECT username FROM user
    WHERE username = ?
    `, [username]);
    console.log(rows[0]);
    return rows[0];
}

export async function getUsers() {
    const rows: any[] = await pool.query(`SELECT username FROM user`);
    console.log(rows);
    return rows;
}

export async function createUser(username: any, email: any, password: any) {
    const result: any[] = await pool.query(`
    INSERT INTO user (username, email, password)
    VALUES (?, ?)
    `, [username, email, password]);
    return getUser(username);
}

export async function getTransactions(transaction_id: number) {
    const rows: any[] = await pool.query(`
      SELECT * FROM transaction
      WHERE transaction_id = ?
    `, [transaction_id]);
    console.log(rows);
    return rows;
  }

  
  export async function createTransaction(transaction_id: number, buyer_username: string, seller_username: string, item_id: number, quantity: number) {
    const result: any[] = await pool.query(`
      INSERT INTO transaction (transaction_id,buyer_username, seller_username,item_id, quantity )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [transaction_id,buyer_username, seller_username,item_id, quantity ]);
    return getTransactions(transaction_id);
  }

  export async function getItemReview(item_id: string) {
    const rows: any[] = await pool.query(`
      SELECT review FROM itemReview
      WHERE item_id = ?` , [item_id]);
    console.log(rows);
    return rows;
  }

  export async function getItemRate(item_id: string) {
    const rows: any[] = await pool.query(`
      SELECT rate_value FROM itemRate
      WHERE item_id = ?
    ` ,[item_id]);
    console.log(rows);
    return rows;
  }


  export async function createItemReview(id_review: number, item_id: string, review: string) {
    const result: any[] = await pool.query(`
      INSERT INTO itemReview (id_review, item_id, review)
      VALUES (?, ?,?)
    `, [id_review, item_id, review]);
    return getItemReview(item_id);
  }

  export async function createItemRate(id_rate: number, item_id: string, rate_value: number) {
    const result: any[] = await pool.query(`
      INSERT INTO itemRate (id_rate, item_id, rate_value)
      VALUES (?, ?, ?)
    `, [id_rate, item_id, rate_value]);
    return getItemRate(item_id);
  }

  export async function getUserReview(username: string) {
    const rows: any[] = await pool.query(`
      SELECT review FROM userReview
      WHERE username = ?` , [username]);
    console.log(rows);
    return rows;
  }

  export async function getUserRate(username: string) {
    const rows: any[] = await pool.query(`
      SELECT rate_value FROM userRate
      WHERE item_id = ?
    ` ,[username]);
    console.log(rows);
    return rows;
  }


  export async function createUserReview(id_review: number, username: string, review: string) {
    const result: any[] = await pool.query(`
      INSERT INTO userReview (id_review, username, review)
      VALUES (?, ?,?)
    `, [id_review, username, review]);
    return getUserReview(username);
  }

  export async function createUserRate(id_rate: number, username: string, rate_value: number) {
    const result: any[] = await pool.query(`
      INSERT INTO userRate (id_rate, username, rate_value)
      VALUES (?, ?, ?)
    `, [id_rate, username, rate_value]);
    return getUserRate(username);
  }


  export async function getChatHistory(username: string) {
    const rows: any[] = await pool.query(`
      SELECT * FROM chat_history
      WHERE sender_username = ? OR receiver_username = ?
      ORDER BY timestamp DESC
    `, [username, username]);
    console.log(rows);
    return rows;
  }
  
  export async function addChatMessage(username: string, receiverUsername: string, message: string) {
    const result: any[] = await pool.query(`
      INSERT INTO chat_history (sender_username, receiver_username, message)
      VALUES (?, ?, ?)
    `, [username, receiverUsername, message]);
    return getChatHistory(username);
  }
  
  export async function getFriends(username: string) {
    const rows: any[] = await pool.query(`
      SELECT user1_username, user2_username FROM friends
      WHERE user1_username = ? OR user2_username = ?
      AND status = 'accepted'
    `, [username, username]);
    console.log(rows);
    return rows;
  }
  
  export async function addFriend(user1Username: string, user2Username: string) {
    const result: any[] = await pool.query(`
      INSERT INTO friends (user1_username, user2_username)
      VALUES (?, ?)
    `, [user1Username, user2Username]);
    return getFriends(user1Username);
  }
