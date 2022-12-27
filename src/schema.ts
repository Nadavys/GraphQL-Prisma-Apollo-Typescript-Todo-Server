import { gql } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const typeDefs = gql`
    enum TodoStatus {
        PENDING,
        IN_PROGRESS,
        COMPLETE
    }

    type Todo {
        id: Int!
        title: String!
        status: TodoStatus!
        createdAt: DateTime
        person: Person
    }   

    type Person {
        id: Int!
        name: String!
        tasks: [Todo]
    } 

    type Query{
        allTodos: [Todo]!
        todoById(id: Int): Todo
        allPersons: [Person]!
        todoFeed(
            searchString: String
            skip: Int
            take: Int
        ): [Todo]
    }

    type Mutation {
        createTodo(title:String):Todo
        updateTodoStatus(id: Int!, newState: TodoStatus!): Todo
        assignTodoToPerson(todoId: Int!, personId: Int!): Todo
    }

    scalar DateTime
`

export const resolvers = {
    Query: {
        allTodos: (_parent, _args, context: Context) => {
            return context.prisma.todo.findMany({ include: { person: true } })
        },
        todoById: (_parent, args: { id: number }, context: Context) => {
            return context.prisma.todo.findUnique({
                where: { id: args.id || undefined },
            })
        },
        allPersons: (_parent, _args, context) => {
            return context.prisma.person.findMany(
                { include: { tasks: true } }
            )
        },
        todoFeed: (_parent, { searchString, skip, take }, context) => {
            return context.prisma.todo.findMany(
                {
                    where: {title: {contains: searchString}},
                    take,
                    skip
                }
            )
        }
    },

    Mutation: {
        updateTodoStatus: (_parent, args, context) => {
            return context.prisma.todo.update({
                where: { id: args.id },
                data: { status: args.newState }
            })
        },
        createTodo: (_parent, { title }, context) => {
            return context.prisma.todo.create({
                data: { title }
            })
        },
        assignTodoToPerson: async (_parent, { todoId, personId }, context) => {
            return await context.prisma.todo.update({
                where: { id: todoId },
                data: {
                    personId
                },
                include: {
                    person: true
                }
            })
        }
    },

    DateTime: DateTimeResolver,
}