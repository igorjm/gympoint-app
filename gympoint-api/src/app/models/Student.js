import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.STRING,
        height: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async student => {
      if (student.password) {
        student.password_hash = await bcrypt.hash(student.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Student;
