import React, { useState, useEffect } from 'react';
import { Trophy, Users, Award, Search, Trash, Edit, Save } from 'lucide-react';

function Leaderboard() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState('male');
  const [searchTerm, setSearchTerm] = useState('');
  const [participants, setParticipants] = useState({
    male: [],
    female: [],
    typing: []
  });

  const [newParticipant, setNewParticipant] = useState({
    name: '',
    year: '',
    score: '',
    typingSpeed: '',
    typingAccuracy: ''
  });

  const [editIndex, setEditIndex] = useState(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const savedParticipants = JSON.parse(localStorage.getItem('participants'));
    if (savedParticipants) setParticipants(savedParticipants);
  }, []);

  // Save data to local storage
  const saveToLocalStorage = (data) => {
    localStorage.setItem('participants', JSON.stringify(data));
  };

  const addOrUpdateParticipant = (e) => {
    e.preventDefault();
    const updatedParticipants = { ...participants };

    if (selectedLeaderboard === 'typing') {
      const score = (parseFloat(newParticipant.typingSpeed) * 0.6 + parseFloat(newParticipant.typingAccuracy) * 0.4);
      newParticipant.score = score.toFixed(2);
    } else {
      newParticipant.score = parseFloat(newParticipant.score);
    }

    if (editIndex !== null) {
      updatedParticipants[selectedLeaderboard][editIndex] = newParticipant;
      setEditIndex(null);
    } else {
      updatedParticipants[selectedLeaderboard] = [
        ...participants[selectedLeaderboard],
        newParticipant
      ];
    }

    setParticipants(updatedParticipants);
    saveToLocalStorage(updatedParticipants);
    
    setNewParticipant({ name: '', year: '', score: '', typingSpeed: '', typingAccuracy: '' });
  };

  const deleteParticipant = (index) => {
    const updatedParticipants = { ...participants };
    updatedParticipants[selectedLeaderboard].splice(index, 1);
    setParticipants(updatedParticipants);
    saveToLocalStorage(updatedParticipants);
  };

  const editParticipant = (index) => {
    setNewParticipant(participants[selectedLeaderboard][index]);
    setEditIndex(index);
  };

  const rankParticipants = () => {
    const updatedParticipants = { ...participants };
    updatedParticipants[selectedLeaderboard].sort((a, b) => {
      if (b.score === a.score) return a.name.localeCompare(b.name);
      return parseFloat(b.score) - parseFloat(a.score);
    });
    setParticipants(updatedParticipants);
    saveToLocalStorage(updatedParticipants);
  };

  const filteredParticipants = participants[selectedLeaderboard].filter(
    participant => participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-6">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          </div>
          <select
            className="bg-white/5 border w-full sm:w-1/4 border-white/20 rounded-md px-3 py-2"
            value={selectedLeaderboard}
            onChange={(e) => setSelectedLeaderboard(e.target.value)}
          >
            <option value="male">Code Challenge (Male)</option>
            <option value="female">Code Challenge (Female)</option>
            <option value="typing">Typing Contest</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              type="text"
              placeholder="Search participants..."
              className="w-full bg-white/10 text-white border border-white/20 rounded-md pl-10 pr-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Participant Form */}
        <form onSubmit={addOrUpdateParticipant} className="mb-6 grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2"
            value={newParticipant.name}
            onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Year/Level"
            className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2"
            value={newParticipant.year}
            onChange={(e) => setNewParticipant({ ...newParticipant, year: e.target.value })}
            required
          />
          {selectedLeaderboard === 'typing' ? (
            <>
              <input
                type="number"
                placeholder="Typing Speed (WPM)"
                className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2"
                value={newParticipant.typingSpeed}
                onChange={(e) => setNewParticipant({ ...newParticipant, typingSpeed: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Typing Accuracy (%)"
                className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2"
                value={newParticipant.typingAccuracy}
                onChange={(e) => setNewParticipant({ ...newParticipant, typingAccuracy: e.target.value })}
                required
              />
            </>
          ) : (
            <input
              type="number"
              placeholder="Score"
              className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2 col-span-2"
              value={newParticipant.score}
              onChange={(e) => setNewParticipant({ ...newParticipant, score: e.target.value })}
              required
            />
          )}
          <button type="submit" className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
            {editIndex !== null ? "Update Participant" : "Add Participant"}
          </button>
        </form>

        {/* Rank Participants */}
        <div className="flex justify-end mb-6">
          <button
            onClick={rankParticipants}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md flex items-center transition-colors"
          >
            <Users className="h-5 w-5 mr-2" />
            Rank Participants
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-white border-b border-white/20">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Year/Level</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant, index) => (
                <tr key={index} className="text-white/90 border-b border-white/10">
                  <td className="px-4 py-2">{participant.name}</td>
                  <td className="px-4 py-2">{participant.year}</td>
                  <td className="px-4 py-2 font-semibold">{participant.score}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => editParticipant(index)} className="text-blue-400"><Edit /></button>
                    <button onClick={() => deleteParticipant(index)} className="text-red-400"><Trash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Leaderboard;
