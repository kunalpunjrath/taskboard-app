/* Taskboard Feeds */

function allUsers(parent, args, ctx, info) {
  return ctx.db.query.users({}, info)
};

function dashboard(parent, {userId, orderBy}, ctx, info) {
  return ctx.db.query.boards({
    where: {
      owner: { id: userId } 
    },
    orderBy
    },
    info)
}

function boardDetails(parent, {boardId}, ctx, info) {
  return ctx.db.query.board({
    where: {
      id: boardId 
    }
    },
    info)
}

module.exports = {
  allUsers,
  dashboard,
  boardDetails
}