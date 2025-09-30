import SkillBar from './SkillBar';

const ParticipantProfile = ({ participant }) => {
  if (!participant) return null;

  return (
    <article className="participant-profile" role="article" aria-labelledby="participant-name">
      <header className="profile-header">
        <div className="avatar" role="img" aria-label={`Foto de ${participant.name}`}>
          {participant.photo_url ? (
            <img 
              src={participant.photo_url} 
              alt={`Foto de perfil de ${participant.name}`}
            />
          ) : (
            <div className="avatar-placeholder" aria-hidden="true">
              {participant.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="basic-info">
          <h2 id="participant-name" className="name">{participant.name}</h2>
          <p className="company" aria-label={`Empresa: ${participant.company}`}>
            {participant.company}
          </p>
          <p className="area" aria-label={`Área de atuação: ${participant.area}`}>
            {participant.area}
          </p>
        </div>
      </header>

      <section className="skills-section" aria-labelledby="skills-title">
        <h3 id="skills-title" className="sr-only">Habilidades e Competências</h3>
        
        <div className="skill-badges" role="list" aria-label="Principais habilidades">
          {participant.skills.slice(0, 3).map((skill, index) => (
            <div 
              key={index} 
              className="skill-badge"
              role="listitem"
              aria-label={`${skill.name}, nível ${skill.level} de 5`}
            >
              {skill.name}
            </div>
          ))}
        </div>

        <div className="skill-bars" role="list" aria-label="Detalhes das habilidades">
          {participant.skills.slice(0, 3).map((skill, index) => (
            <SkillBar 
              key={index}
              name={skill.name}
              level={skill.level}
              category={skill.category}
            />
          ))}
        </div>
      </section>
    </article>
  );
};

export default ParticipantProfile;
