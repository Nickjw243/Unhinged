"""empty message

Revision ID: 19e275b315e8
Revises: 048dc31613ab
Create Date: 2024-02-01 13:29:56.430051

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19e275b315e8'
down_revision = '048dc31613ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('checkin', schema=None) as batch_op:
        batch_op.drop_column('checkin_date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('checkin', schema=None) as batch_op:
        batch_op.add_column(sa.Column('checkin_date', sa.DATE(), nullable=True))

    # ### end Alembic commands ###
