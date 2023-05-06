"""initial-migration

Revision ID: bf2f8f655adc
Revises: 
Create Date: 2023-05-06 20:48:33.845392

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf2f8f655adc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('last_name', sa.String(length=100), nullable=False),
    sa.Column('gender', sa.String(length=1), nullable=True),
    sa.Column('email', sa.String(length=50), nullable=True),
    sa.Column('contact', sa.String(length=200), nullable=True),
    sa.Column('address', sa.String(length=200), nullable=True),
    sa.Column('user_type', sa.String(length=100), nullable=True),
    sa.Column('password', sa.String(length=20), nullable=True),
    sa.Column('registered_at', sa.String(length=200), nullable=True),
    sa.Column('updated_at', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Food_Items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('status', sa.String(length=10), nullable=True),
    sa.Column('price_unit', sa.String(length=4), nullable=True),
    sa.Column('price', sa.String(length=250), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('grand_price', sa.Integer(), nullable=True),
    sa.Column('registered_by', sa.Integer(), nullable=True),
    sa.Column('registered_at', sa.String(length=200), nullable=True),
    sa.Column('updated_by', sa.Integer(), nullable=True),
    sa.Column('updated_at', sa.String(length=200), nullable=True),
    sa.ForeignKeyConstraint(['registered_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['updated_by'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Food_Items')
    op.drop_table('users')
    # ### end Alembic commands ###