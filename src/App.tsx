import VIPRegistrationForm from './components/VIPRegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: 'Impact, Arial Black, sans-serif', color: 'white', textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' }}>
              PARTY NATION VIP
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4">
              Underground Pop-Up Parties
            </h2>

            <div className="max-w-2xl mx-auto bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-yellow-500/40">
              <p className="text-gray-200 text-lg leading-relaxed">
                All parties and events are for registered VIP members only.
                All attendees must be on the VIP list at the door.
                To register, fill in the form below with your full legal name (as it appears on your ID),
                age, and your preferred method of contact for underground party access and invitations.
              </p>
            </div>
          </div>

          <div>
            <VIPRegistrationForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Questions? DM us on Instagram or text the number you provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
