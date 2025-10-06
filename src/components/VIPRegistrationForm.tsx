import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { supabase, VIPMember } from '../lib/supabase';

export default function VIPRegistrationForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    phone_number: '',
    instagram_handle: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.full_name.trim()) {
      setError('Full legal name is required');
      return;
    }

    const age = parseInt(formData.age);
    if (!age || age < 18) {
      setError('You must be 18 or older to register');
      return;
    }

    if (!formData.phone_number.trim() && !formData.instagram_handle.trim()) {
      setError('Please provide at least one contact method (phone number or Instagram handle)');
      return;
    }

    setLoading(true);

    try {
      const newMember: Omit<VIPMember, 'id' | 'created_at' | 'updated_at'> = {
        full_name: formData.full_name.trim(),
        age: age,
        phone_number: formData.phone_number.trim() || null,
        instagram_handle: formData.instagram_handle.trim() || null
      };

      const { error: insertError } = await supabase
        .from('vip_members')
        .insert([newMember]);

      if (insertError) throw insertError;

      setFormData({
        full_name: '',
        age: '',
        phone_number: '',
        instagram_handle: ''
      });

      alert('Registration successful! You are now on the VIP list.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black/70 backdrop-blur-md p-8 rounded-lg border border-yellow-500/30 shadow-2xl relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/Untitled%20(1000%20x%201000%20px).png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="text-yellow-500" size={28} />
          <h2 className="text-2xl font-bold text-yellow-500">Membership Registration</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-200 mb-1">
            Full Legal Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded focus:border-yellow-500 focus:outline-none text-white"
            placeholder="Enter full name as it appears on ID"
            required
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-200 mb-1">
            Age <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            id="age"
            min="18"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded focus:border-yellow-500 focus:outline-none text-white"
            placeholder="Must be 18+"
            required
          />
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-300 mb-3">
            Preferred Contact Method <span className="text-gray-400">(choose at least one)</span>
          </p>

          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-200 mb-1">
              Phone Number (for text updates)
            </label>
            <input
              type="tel"
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded focus:border-yellow-500 focus:outline-none text-white"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="mt-3">
            <label htmlFor="instagram_handle" className="block text-sm font-medium text-gray-200 mb-1">
              Instagram Handle (for VIP page invitations)
            </label>
            <input
              type="text"
              id="instagram_handle"
              value={formData.instagram_handle}
              onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded focus:border-yellow-500 focus:outline-none text-white"
              placeholder="@yourusername"
            />
          </div>
        </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black font-bold rounded transition-colors duration-200"
        >
          {loading ? 'Registering...' : 'Register for VIP Access'}
        </button>
      </div>
    </form>
  );
}
