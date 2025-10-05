import { useState, useEffect } from 'react';
import { Users, Phone, Instagram } from 'lucide-react';
import { supabase, VIPMember } from '../lib/supabase';

export default function VIPList() {
  const [members, setMembers] = useState<VIPMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vip_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error('Error fetching VIP members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member =>
    member.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg border border-yellow-500/30 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-yellow-500" size={28} />
        <h2 className="text-2xl font-bold text-yellow-500">VIP Member List</h2>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded focus:border-yellow-500 focus:outline-none text-white"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-8">Loading VIP members...</p>
      ) : filteredMembers.length === 0 ? (
        <p className="text-center text-gray-400 py-8">
          {searchTerm ? 'No members found matching your search.' : 'No VIP members registered yet.'}
        </p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-black/40 border border-gray-700 rounded-lg p-4 hover:border-yellow-500/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{member.full_name}</h3>
                  <p className="text-sm text-gray-400">Age: {member.age}</p>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                {member.phone_number && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Phone size={14} className="text-yellow-500" />
                    <span>{member.phone_number}</span>
                  </div>
                )}
                {member.instagram_handle && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Instagram size={14} className="text-yellow-500" />
                    <span>{member.instagram_handle}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 text-center">
          Total VIP Members: <span className="text-yellow-500 font-semibold">{members.length}</span>
        </p>
      </div>
    </div>
  );
}
