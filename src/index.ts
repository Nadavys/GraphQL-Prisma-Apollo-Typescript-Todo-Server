import { ApolloServer } from 'apollo-server'
import { context } from './context'
import {typeDefs, resolvers} from './schema'

new ApolloServer({
    context, resolvers, typeDefs
})
.listen(
    {port: 4000},
    ()=>{ console.log(`Apollo server ready on http://localhost:4000`) }
)