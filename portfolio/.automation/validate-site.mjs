/**
 * Validação estática sem bibliotecas externas.
 * Execute a partir da raiz do NOVO repositório: node portfolio/.automation/validate-site.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '..');
const repo = path.resolve(site, '..');
const read = (p) => fs.readFileSync(path.join(site, p), 'utf8');
const files = [
  'index.html','privacidade.html','assets/style.css','assets/app.js',
  'assets/projects.js','assets/config.js','assets/favicon.svg',
  'assets/social.svg','assets/Azeredo-Design-Portfolio.pdf'
];
files.forEach((file) => assert(fs.existsSync(path.join(site,file)), 'Arquivo faltante: '+file));

const html = read('index.html');
const jsFiles = ['assets/app.js','assets/config.js','assets/projects.js'];
jsFiles.forEach((file) => { new vm.Script(read(file), {filename:file}); });
assert(html.includes('lang="pt-BR"'), 'Idioma pt-BR não configurado');
assert(html.includes('name="viewport"'), 'Configuração responsiva ausente');
assert(html.includes('id="projectGrid"'), 'Grid de projetos ausente');
assert(html.includes('id="projectSearch"'), 'Busca do portfólio ausente');
assert(html.includes('id="projectDialog"'), 'Janela de detalhes ausente');
assert(html.includes('id="presentationDialog"'), 'Apresentação online ausente');
assert(html.includes('id="leadForm"'), 'Formulário comercial ausente');
assert(html.includes('href="privacidade.html"'), 'Link de privacidade ausente');

const references = [...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map(match=>match[1]);
references.forEach(p => assert(fs.existsSync(path.join(site,p)), 'Recurso de interface ausente: '+p));

const globals = {window:{}};
vm.runInNewContext(read('assets/projects.js'), globals);
const projects = globals.window.AZEREDO_PROJECTS;
assert(Array.isArray(projects) && projects.length >= 20, 'Portfólio insuficiente');
const ids = new Set();
const allowed = new Set(['ia','gestao','web','educacao','operacao']);
for(const p of projects){
  assert(p && typeof p.id === 'string' && p.id, 'ID de projeto inválido');
  assert(!ids.has(p.id), 'ID duplicado: '+p.id);ids.add(p.id);
  assert(p.name && p.summary && p.description, 'Dados de projeto incompletos: '+p.id);
  assert(allowed.has(p.category), 'Categoria inválida: '+p.id);
  assert(Array.isArray(p.colors) && p.colors.length === 3, 'Cores ausentes: '+p.id);
  if(p.demo) {
    const url = new URL(p.demo);
    assert(url.protocol === 'https:', 'Demonstração precisa usar HTTPS: '+p.id);
  }
}
const pdf=fs.readFileSync(path.join(site,'assets/Azeredo-Design-Portfolio.pdf'));
assert(pdf.subarray(0,5).toString() === '%PDF-', 'O PDF não possui cabeçalho válido');
assert(pdf.length > 5000, 'O PDF parece incompleto');
const pdfText=pdf.toString('latin1');
const xref=/startxref\s+(\d+)\s+%%EOF/.exec(pdfText);
assert(xref && pdfText.slice(Number(xref[1]),Number(xref[1])+4)==='xref','Índice PDF incorreto');

const firebase=JSON.parse(fs.readFileSync(path.join(site,'firebase.json'),'utf8'));
assert(firebase.hosting.public === 'portfolio','Pasta do Firebase Hosting incorreta');
assert((firebase.hosting.ignore||[]).includes('**/.*'), 'Configurações internas não devem ser publicadas');
assert(!html.includes('-----BEGIN PRIVATE KEY-----'), 'Credencial sensível em HTML');

const report={
  status:'APROVADO',
  files:files.length,
  projects:projects.length,
  categories:[...new Set(projects.map(p=>p.category))].length,
  presentation:'PDF consistente',
  deploy:'pronto após configuração do Firebase'
};
console.log('VALIDAÇÃO AZEREDO DESIGN:',JSON.stringify(report,null,2));
