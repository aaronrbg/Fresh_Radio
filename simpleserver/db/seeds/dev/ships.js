
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ships').del()
    .then(function () {
      // Inserts seed entries
      return knex('ships').insert([
        {id: 1, name: "barbosa-beats", path: 'http://localhost', user_id: 1, current_track: 0, current_position_millis: 0, is_paused: true, time_stamp: 0, pimg: '', crew: 0},
        {id: 2, name: "jacks-jams", path: 'http://localhost', user_id: 2, current_track: 0, current_position_millis: 0, is_paused: true, time_stamp: 0, pimg: '', crew: 0},
        {id: 3, name: "daveys-tunes", path: 'http://localhost', user_id: 3, current_track: 0, current_position_millis: 0, is_paused: true, time_stamp: 0, pimg: '', crew: 0},
      ]);
    });
};
