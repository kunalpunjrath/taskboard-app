/* Taskboard Mutations */

function createUser(parent, { name, email }, ctx, info) {
  return ctx.db.mutation.createUser({ data: { name, email } }, info)
};

async function createBoard(parent, { title, userId }, ctx, info) {
  const userExists = await ctx.db.exists.User({
    id: userId
  })
  if(!userExists) {
    throw new Error(`Invalid User Id: ${userId}`)
  }
  const allBoards = await ctx.db.query.boards({
    user: { id: userId } 
    },
    info)
  const positionIndex = allBoards.length + 1
  return ctx.db.mutation.createBoard({ 
    data: {
      title,
      positionIndex,
      owner: { connect: { id: userId } }
      }
    }, info)
};

async function updateBoard(parent, { boardId, title }, ctx, info) {
  const boardExists = await ctx.db.exists.Board({
    id: boardId
  })
  if(!boardExists) {
    throw new Error(`Invalid Board Id: ${boardId}`)
  }
  return ctx.db.mutation.updateBoard({ 
    where: {
      id: boardId
    },
    data: {
      title
    }
    }, info)
};

/* List Mutations */

async function createList(parent, { title, boardId }, ctx, info) {
  const boardExists = await ctx.db.exists.Board({
    id: boardId
  })
  if(!boardExists) {
    throw new Error(`Invalid Board Id: ${boardId}`)
  }
  const allLists = await ctx.db.query.lists({
    board: { id: boardId } 
    },
    info)
  const positionIndex = allLists.length + 1
  return ctx.db.mutation.createList({ 
    data: {
      title,
      positionIndex,
      board: { connect: { id: boardId } }
      }
    }, info)
};

async function updateList(parent, { listId, title }, ctx, info) {
  const listExists = await ctx.db.exists.List({
    id: listId
  })
  if(!listExists) {
    throw new Error(`Invalid List Id: ${listId}`)
  }
  return ctx.db.mutation.updateList({ 
    where: {
      id: listId
    },
    data: {
      title
    }
    }, info)
};

/* Card Mutations */

async function createCard(parent, { listId, title, description}, ctx, info) {
  const listExists = await ctx.db.exists.List({
    id: listId
  })
  if(!listExists) {
    throw new Error(`Invalid List Id: ${listId}`)
  }
  const list = await ctx.db.query.list({
    where: { id: listId }
  })
  console.log('List obj: ', list)
  let cardPositionIndexes = { list }
  const positionIndex = cardPositionIndexes.length + 1
  cardPositionIndexes.push(positionIndex)

  ctx.db.mutation.updateList({ 
    where: {
      id: listId
    },
    data: {
      cardPositionIndexes
    }
    }, info)
  
  return ctx.db.mutation.createCard({ 
    data: {
      list: { connect: { id: listId } },
      title,
      status: list.title,
      description
      }
    }, info)
};

async function updateCard(parent, { cardId, title, description, status, dueDate }, ctx, info) {
  const cardExists = await ctx.db.exists.Card({
    id: cardId
  })
  if(!cardExists) {
    throw new Error(`Invalid Card Id: ${cardId}`)
  }
  return ctx.db.mutation.updateCard({ 
    where: {
      id: cardId
    },
    data: {
      title,
      description,
      status,
      dueDate
    }
    }, info)
};

async function deleteCard(parent, { cardId }, ctx, info) {
  const cardExists = await ctx.db.exists.Card({
    id: cardId
  })
  if(!cardExists) {
    throw new Error(`Invalid Card Id: ${cardId}`)
  }
  return ctx.db.mutation.deleteCard({ 
    where: {
      id: cardId
    }
    }, info)
};

/* function updateCardPositions(parent, { cards }, ctx, info) {
  const updatedCards = []
  cards.forEach(async (card) => {
    let updatedCard = await ctx.db.mutation.updateCard({ 
    where: {
      id: card.id
    },
    data: {
      positionIndex: card.newIndex
    }
    }, info)
    updatedCards.push(updatedCard)
  })
  return updatedCards
} */


module.exports = {
    createUser,
    createBoard,
    updateBoard,
    createList,
    updateList,
    createCard,
    updateCard,
    deleteCard,
    // updateCardPositions
}