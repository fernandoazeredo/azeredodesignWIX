(function () {
  'use strict';
  var projects = Array.isArray(window.AZEREDO_PROJECTS) ? window.AZEREDO_PROJECTS : [];
  var config = window.AZEREDO_CONFIG || {};
  var labels = {ia:'IA & Automação',gestao:'Gestão & ERP',web:'Sites & Web',educacao:'Educação & Interatividade',operacao:'Operação & Logística'};
  var grid = document.getElementById('projectGrid');
  var projectDialog = document.getElementById('projectDialog');
  var selected = 'todos', searchQuery = '';
  var searchField=document.getElementById('projectSearch'), clearSearch=document.getElementById('clearProjectSearch');
  function normalize(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
  function updateFilterButtons(){document.querySelectorAll('.filter').forEach(function(b){var active=b.dataset.filter===selected;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})}
  function safeText(node, text) { node.textContent = text == null ? '' : String(text); }
  function labelText(cat) { return labels[cat] || 'Solução digital'; }
  function makeProject(p) {
    var el = document.createElement('article');
    el.className = 'project';
    var cover = document.createElement('div');
    cover.className = 'project-cover cover-' + (p.category==='educacao'?'educacao':p.category==='web'?'web':'sistema');
    cover.style.setProperty('--accent1',p.colors[0]);cover.style.setProperty('--accent2',p.colors[1]);cover.style.setProperty('--accent3',p.colors[2]);
    var top = document.createElement('span');top.className='cover-label';top.textContent='AZEREDO / PROJETOS';
    var glyph = document.createElement('span');glyph.className='cover-icon';glyph.textContent='↗';
    var preview=document.createElement('div');preview.className='preview';
    var head=document.createElement('div');head.className='preview-top';
    for(var d=0;d<3;d++){head.appendChild(document.createElement('i'))}
    var name=document.createElement('strong');name.textContent=p.monogram;head.appendChild(name);
    var content=document.createElement('div');content.className='preview-content';
    var side=document.createElement('div');side.className='preview-sidebar';
    for(var s=0;s<5;s++){side.appendChild(document.createElement('i'))}
    var main=document.createElement('div');main.className='preview-main';
    for(var t=0;t<3;t++){main.appendChild(document.createElement('b'))}
    var chart=document.createElement('span');chart.className='preview-chart';main.appendChild(chart);
    content.appendChild(side);content.appendChild(main);preview.appendChild(head);preview.appendChild(content);cover.appendChild(top);cover.appendChild(glyph);cover.appendChild(preview);
    var body=document.createElement('div');body.className='project-content';
    var meta=document.createElement('p');meta.className='project-meta';meta.textContent=p.label;
    var title=document.createElement('h3');title.textContent=p.name;
    var desc=document.createElement('p');desc.textContent=p.summary;
    var bottom=document.createElement('div');bottom.className='project-bottom';
    var kind=document.createElement('span');kind.textContent=labelText(p.category);
    var button=document.createElement('button');button.type='button';button.textContent='Ver projeto ↗';button.setAttribute('aria-label','Ver detalhes de '+p.name);button.addEventListener('click',function(){openProject(p)});
    bottom.appendChild(kind);bottom.appendChild(button);
    body.appendChild(meta);body.appendChild(title);body.appendChild(desc);body.appendChild(bottom);
    el.appendChild(cover);el.appendChild(body);return el;
  }
  function render() {
    grid.replaceChildren();
    var visible=projects.filter(function(p){
      if(selected!=='todos'&&p.category!==selected)return false;
      return !searchQuery||normalize([p.name,p.label,p.summary,p.description,p.tech].join(' ')).includes(searchQuery);
    });
    visible.forEach(function(p){grid.appendChild(makeProject(p))});
    safeText(document.getElementById('countProjects'),String(visible.length).padStart(2,'0'));
    safeText(document.getElementById('projectResultText'),visible.length+' projeto'+(visible.length===1?' encontrado':'s encontrados')+' de '+projects.length+' cadastrados');
    document.getElementById('projectsEmpty').hidden=visible.length!==0;
    clearSearch.hidden=searchField.value.length===0;
  }
  document.querySelectorAll('.filter').forEach(function(button){
    button.addEventListener('click',function(){selected=button.dataset.filter;updateFilterButtons();render()});
  });
  searchField.addEventListener('input',function(){searchQuery=normalize(searchField.value);render()});
  clearSearch.addEventListener('click',function(){searchField.value='';searchQuery='';render();searchField.focus()});
  document.getElementById('resetProjectFilters').addEventListener('click',function(){selected='todos';searchQuery='';searchField.value='';updateFilterButtons();render();searchField.focus()});
  function openProject(p){
    safeText(document.getElementById('modalEyebrow'),p.label);
    safeText(document.getElementById('modalTitle'),p.name);
    safeText(document.getElementById('modalDescription'),p.description);
    safeText(document.getElementById('modalCategory'),labelText(p.category));
    safeText(document.getElementById('modalTech'),p.tech);
    var art=document.getElementById('modalArt');art.replaceChildren();art.style.background='linear-gradient(125deg,'+p.colors[0]+','+p.colors[1]+')';
    var initials=document.createElement('span');initials.className='modal-initials';initials.textContent=p.monogram;art.appendChild(initials);
    var links=document.getElementById('modalLinks');links.replaceChildren();
    if(p.demo){var link=document.createElement('a');link.href=p.demo;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Abrir demonstração pública ↗';links.appendChild(link);}
    else {var span=document.createElement('span');span.textContent='Demonstração sob consulta e autorização.';span.style.color='#9fb3c9';span.style.fontSize='12px';links.appendChild(span);}
    projectDialog.showModal();
  }
  document.getElementById('closeProject').addEventListener('click',function(){projectDialog.close()});
  var menu=document.getElementById('mainNav'), toggle=document.getElementById('menuToggle');
  toggle.addEventListener('click',function(){var expanded=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(expanded));toggle.setAttribute('aria-label',expanded?'Fechar menu':'Abrir menu')});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')})});
  document.getElementById('year').textContent=new Date().getFullYear();
  var slides=[
    {tag:'01 / APRESENTAÇÃO',title:'Ideias que se tornam <span>soluções digitais.</span>',desc:'Azeredo Design & Tecnologia. Estratégia empresarial, experiências intuitivas e desenvolvimento digital sob medida.',tags:['SOFTWARE','GESTÃO','DESIGN','INTELIGÊNCIA ARTIFICIAL']},
    {tag:'02 / QUEM SOMOS',title:'Entendemos o negócio. <span>Criamos a solução.</span>',desc:'Nossa abordagem conecta necessidades reais a produtos que organizam processos, facilitam decisões e melhoram a experiência do usuário.',tags:['Visão gerencial','Experiência do usuário','Evolução contínua']},
    {tag:'03 / O QUE ENTREGAMOS',title:'Tecnologia para <span>cada desafio.</span>',desc:'Sistemas e ERPs personalizados. Inteligência artificial aplicada. Sites institucionais. Aplicativos e experiências educativas interativas.',tags:['ERP & Financeiro','IA & Automação','Web & UX','Aplicativos']},
    {tag:'04 / PORTFÓLIO',title:'Projetos que unem <span>ideias e execução.</span>',desc:'Processo 360 IA, Fluxo 360, SEVENPRO, StoryPlay, Tesouraria, soluções de operação e sites institucionais são exemplos de nossa atuação.',tags:['Inteligência Artificial','Gestão','StoryPlay','Sites']},
    {tag:'05 / METODOLOGIA',title:'Da primeira conversa <span>à evolução.</span>',desc:'Escutamos o desafio, estruturamos o conceito, desenvolvemos com qualidade e acompanhamos os próximos passos do produto.',tags:['01 Entender','02 Desenhar','03 Construir','04 Evoluir']},
    {tag:'06 / CONTATO',title:'Vamos criar <span>o próximo projeto?</span>',desc:'Azeredo Design & Tecnologia. Entre em contato através dos canais comerciais informados em nosso site.',tags:['Estratégia','Design','Tecnologia']}
  ];
  var slideIndex=0, pd=document.getElementById('presentationDialog');
  function renderSlide(){
    var s=slides[slideIndex],body=document.getElementById('slideBody');
    body.replaceChildren();
    var tag=document.createElement('small');tag.textContent=s.tag;body.appendChild(tag);
    var heading=document.createElement('h2');heading.innerHTML=s.title;body.appendChild(heading);
    var p=document.createElement('p');p.textContent=s.desc;body.appendChild(p);
    var tags=document.createElement('div');tags.className='slide-tags';
    s.tags.forEach(function(t){var b=document.createElement('b');b.textContent=t;tags.appendChild(b)});
    body.appendChild(tags);
    document.getElementById('slideCounter').textContent=String(slideIndex+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    document.getElementById('prevSlide').disabled=slideIndex===0;
    document.getElementById('nextSlide').disabled=slideIndex===slides.length-1;
  }
  document.getElementById('openPresentation').addEventListener('click',function(){slideIndex=0;renderSlide();pd.showModal()});
  document.getElementById('closePresentation').addEventListener('click',function(){pd.close()});
  document.getElementById('prevSlide').addEventListener('click',function(){if(slideIndex>0){slideIndex--;renderSlide()}});
  document.getElementById('nextSlide').addEventListener('click',function(){if(slideIndex<slides.length-1){slideIndex++;renderSlide()}});
  pd.addEventListener('keydown',function(event){
    if(event.key==='ArrowRight'&&slideIndex<slides.length-1){slideIndex++;renderSlide();}
    if(event.key==='ArrowLeft'&&slideIndex>0){slideIndex--;renderSlide();}
  });
  var cd=document.getElementById('contactDialog'), trigger=document.getElementById('contactTrigger'), contactStatus=document.getElementById('contactStatus');
  if(config.commercialEmail||config.whatsapp){contactStatus.textContent='Atendimento comercial por contato direto.';}
  trigger.addEventListener('click',function(){document.getElementById('leadFeedback').textContent='';cd.showModal()});
  document.getElementById('closeContact').addEventListener('click',function(){cd.close()});
  document.getElementById('leadForm').addEventListener('submit',function(event){
    event.preventDefault();
    var fd=new FormData(event.currentTarget), feedback=document.getElementById('leadFeedback');
    var name=String(fd.get('nome')||'').trim(),company=String(fd.get('empresa')||'').trim();
    var service=String(fd.get('servico')||'').trim(), message=String(fd.get('mensagem')||'').trim();
    if(!name||!service||!message){feedback.textContent='Preencha os campos obrigatórios.';return}
    var text='Olá, equipe Azeredo Design!%0A%0A'; // replaced below with safe encoded text
    var raw='Olá, equipe Azeredo Design!\n\nNome: '+name+'\nEmpresa: '+(company||'Não informada')+'\nServiço: '+service+'\nProjeto: '+message;
    if(config.whatsapp && /^[0-9]{10,15}$/.test(config.whatsapp)){
      feedback.textContent='Abrindo WhatsApp com a mensagem pronta.';
      window.open('https://wa.me/'+config.whatsapp+'?text='+encodeURIComponent(raw),'_blank','noopener,noreferrer');
    } else if(config.commercialEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.commercialEmail)){
      feedback.textContent='Abrindo seu aplicativo de e-mail com a proposta.';
      window.location.href='mailto:'+encodeURIComponent(config.commercialEmail)+'?subject='+encodeURIComponent('Proposta - Azeredo Design')+'&body='+encodeURIComponent(raw);
    } else {
      feedback.textContent='Canal comercial ainda não configurado. Copie sua mensagem para guardar e enviar quando o atendimento for ativado.';
      var copy=document.createElement('button');copy.type='button';copy.textContent='Copiar mensagem';copy.className='button button-ghost';
      copy.addEventListener('click',function(){if(navigator.clipboard){navigator.clipboard.writeText(raw).then(function(){feedback.textContent='Mensagem copiada.'}).catch(function(){feedback.textContent=raw})}else feedback.textContent=raw});
      var current=feedback.nextElementSibling;if(current&&current.classList.contains('button')) current.remove();
      feedback.insertAdjacentElement('afterend',copy);
    }
  });
  document.querySelectorAll('dialog').forEach(function(d){d.addEventListener('click',function(e){if(e.target===d){d.close()}})});
  render();
})();