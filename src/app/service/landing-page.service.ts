import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Info } from 'src/app/model/info.model';
import { Project } from 'src/app/model/project.model';
import { Skill } from 'src/app/model/skill.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

type InitialRequests = {
  infos: null | boolean,
  skills: null | boolean,
  projects: null | boolean
}
@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  // API = 'http://localhost:8000/api/'
  API = 'api/'
  infos?: Info
  projects?: Project[]
  skills?: Skill[]
  isLoadedInfos = false
  onCompleteRequest = new Subject<boolean>()

  initialRequests: InitialRequests = {
    infos: null,
    skills: null,
    projects: null
  }

  sortOrder = (keyOne: any, keyTwo: any) => keyOne.order > keyTwo.order ? 1 : keyOne.order < keyTwo.order ? -1 : 0

  constructor(
    private http: HttpClient,
    private route: Router,
  ){
    const oldUrl = this.route.url
    if(this.route.url !== '/login')
      this.route.navigate(['/carregamento'])

    this.onCompleteRequest.subscribe(isComplete => {
      if(isComplete)
        this.route.navigate([oldUrl == '/painel' ? '/painel' : '/'])
    })

    this.loadedInformations().subscribe((response) => {
      this.isLoadedInfos = true
      this.onCompleteRequest.next(true)
      this.spinnerAnimate(false)
    })
  }

  checkInitialRequests(subscriber: any){
    if(Object.values(this.initialRequests).indexOf(null) == -1){
      const isSuccess = Object.values(this.initialRequests).indexOf(null) == -1
      subscriber.next(isSuccess)
    }
  }

  loadedInformations():Observable<any>{
    const requests = new Observable(subscriber => {
      this.getInfos().subscribe(
        infos => {
          this.infos = infos
          this.initialRequests.infos = false
          this.checkInitialRequests(subscriber)
        },
        error => {
          this.initialRequests.infos = false
          this.checkInitialRequests(subscriber)
        }
      )

      this.getProjects().subscribe(
        projects => {
          this.projects = projects
          this.initialRequests.projects = true
          this.checkInitialRequests(subscriber)
        },
        error => {
          this.initialRequests.projects = false
          this.checkInitialRequests(subscriber)
        }
      )

      this.getSkills().subscribe(
        skills => {
          this.skills = skills
          this.initialRequests.skills = true
          this.checkInitialRequests(subscriber)
        },
        error => {
          this.initialRequests.skills = false
          this.checkInitialRequests(subscriber)
        }
      )
    })

    return requests
  }

  spinnerAnimate(show: boolean){
    const spinner = document.getElementById('spinner')
    if(spinner == null)
      return

    spinner.style.display = show ? 'flex' : 'none'
    spinner.style.visibility = show ? 'visible' : 'hidden'
  }

  getSkills(): Observable<Skill[]>{
    // return of(this.localSkills)
    return this.http.get<Skill[]>(this.API + 'skills')
  }

  getInfos(): Observable<Info>{
    // return of(this.localInfos)
    return this.http.get<Info>(this.API + 'infos')
  }

  getProjects(): Observable<Project[]>{
    // return of(this.localProjects)
    return this.http.get<Project[]>(this.API + 'projects')
  }

  localSkills: Skill[] = [
      {
          "id": 15,
          "name": "HTML",
          "order": 1,
          "img": "images/img/Hm9CWyJ1VgAqqEE3DYdOUVoBINnrGhGjfP5KJvC1.png",
          "skill_link": "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
          "certificate": null,
          "description": "HTML é uma linguagem de marcação utilizada na construção de páginas na Web. Documentos HTML podem ser interpretados por navegadores. A tecnologia é fruto da junção entre os padrões HyTime e SGML. HyTime é um padrão para a representação estruturada de hipermídia e conteúdo baseado em tempo. HTML (Linguagem de Marcação de HiperTexto) é o bloco de construção mais básico da web. Define o significado e a estrutura do conteúdo da web.",
          "created_at": "2022-12-22T17:58:00.000000Z",
          "updated_at": "2022-12-22T18:40:21.000000Z"
      },
      {
          "id": 16,
          "name": "CSS",
          "order": 2,
          "img": "images/img/gBEbP0EbEJw5dFnGnVMVfQTTDXrfwBZ8UCEsjkKC.jpg",
          "skill_link": "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
          "certificate": null,
          "description": "Cascading Style Sheets é um mecanismo para adicionar estilos a uma página web, aplicado diretamente nas tags HTML ou ficar contido dentro das tags <style>. Também é possível, adicionar estilos adicionando um link para um arquivo CSS que contém os estilos.",
          "created_at": "2022-12-22T18:04:32.000000Z",
          "updated_at": "2022-12-22T18:40:21.000000Z"
      },
      {
          "id": 17,
          "name": "JavaScript",
          "order": 3,
          "img": "images/img/AXwuH6s6DLxCsB7nzm8bzu3MqpmQayN3rRabDqV7.png",
          "skill_link": "https://www.javascript.com/",
          "certificate": null,
          "description": "JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma. Juntamente com HTML e CSS, o JavaScript é uma das três principais tecnologias da World Wide Web.",
          "created_at": "2022-12-22T18:06:53.000000Z",
          "updated_at": "2022-12-22T18:40:21.000000Z"
      },
      {
          "id": 18,
          "name": "Jquery",
          "order": 4,
          "img": "images/img/847YnIT8dGqvP5ZyH2RJHPaVbJntXtheNr4hOP6x.png",
          "skill_link": "https://jquery.com/",
          "certificate": null,
          "description": "jQuery é uma biblioteca livre que contém funções da linguagem de programação JavaScript que interage com páginas em HTML, desenvolvida para simplificar os scripts executados/interpretados no navegador de internet do usuário.",
          "created_at": "2022-12-22T18:08:51.000000Z",
          "updated_at": "2022-12-22T18:40:22.000000Z"
      },
      {
          "id": 19,
          "name": "TypeScript",
          "order": 5,
          "img": "images/img/phHAstmZ5MsCCYvs7FpL8qjl98BOzX6y2vCkyHFK.png",
          "skill_link": "https://www.typescriptlang.org/",
          "certificate": null,
          "description": "TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft. É um superconjunto sintático estrito de JavaScript e adiciona tipagem estática opcional à linguagem.",
          "created_at": "2022-12-22T18:10:38.000000Z",
          "updated_at": "2022-12-22T18:40:22.000000Z"
      },
      {
          "id": 20,
          "name": "Angular",
          "order": 6,
          "img": "images/img/FlgD58AgE26xOuVn5vQlETxLHlSmxRpAXcYh5kjJ.png",
          "skill_link": "https://angular.io/",
          "certificate": null,
          "description": "Angular é uma plataforma de aplicações web de código-fonte aberto e front-end baseado em TypeScript liderado pela Equipe Angular do Google e por uma comunidade de indivíduos e corporações. Angular é uma reescrita completa do AngularJS, feito pela mesma equipe que o construiu.",
          "created_at": "2022-12-22T18:13:02.000000Z",
          "updated_at": "2022-12-22T18:40:22.000000Z"
      },
      {
          "id": 21,
          "name": "PHP",
          "order": 7,
          "img": "images/img/ttvfzj5XIZAHTfsaMRuLeJaXZhUbMFhX7dh1XWj7.jpg",
          "skill_link": "https://www.php.net/",
          "certificate": null,
          "description": "PHP é uma linguagem de script de propósito geral voltada para o desenvolvimento web. Ele foi originalmente criado pelo programador dinamarquês-canadense Rasmus Lerdorf em 1993 e lançado em 1995. A implementação de referência do PHP é agora produzida pelo The PHP Group.",
          "created_at": "2022-12-22T18:16:01.000000Z",
          "updated_at": "2022-12-22T18:40:22.000000Z"
      },
      {
          "id": 22,
          "name": "POO",
          "order": 8,
          "img": null,
          "skill_link": "https://www.alura.com.br/artigos/poo-programacao-orientada-a-objetos",
          "certificate": null,
          "description": "Programação orientada a objetos é um paradigma de programação baseado no conceito de \"objetos\", que podem conter dados na forma de campos, também conhecidos como atributos, e códigos, na forma de procedimentos, também conhecidos como métodos.",
          "created_at": "2022-12-22T18:17:37.000000Z",
          "updated_at": "2022-12-22T18:40:23.000000Z"
      },
      {
          "id": 1,
          "name": "Laravel",
          "order": 9,
          "img": "images/img/gXRcc35nEAhlnIFUvIFDSgSS9epmPUl5F3NlTpCp.png",
          "skill_link": "https://laravel.com/",
          "certificate": "images/certificate/m18IGM8Q8ecNKeomjwD67FJePHRRNEaNlIKEm9AG.jpg",
          "description": "Laravel é um framework PHP gratuito e de código aberto, utilizado no desenvolvimento de sistemas para web. Algumas de suas principais características são permitir a escrita de um código mais simples e legível, e suporte a recursos avançados que agilizam o processo de desenvolvimento. Por ser muito famoso e poderoso, o Laravel já foi usado por diversas empresas, dentre elas as mais famosas são a Disney, Twitch e Worner Bros. Eu aprendi esse framework e todas as suas dependencias teoricas na documentação do proprio Laravel, video no Youtube, em foruns como o StackOverflow, mas Principalmente em um <a href=\"https://www.udemy.com/course/laravelcompleto/?src=sac&kw=laravel+5.8\" target=\"_blank\">Curso da Udemy</a>",
          "created_at": null,
          "updated_at": "2022-12-22T19:14:31.000000Z"
      },
      {
          "id": 23,
          "name": "MySQL",
          "order": 10,
          "img": "images/img/WbFN9Y2zxkLVTV7vDG38D4MtxXYG3QCVNUE98kKw.jpg",
          "skill_link": "https://dev.mysql.com/doc/",
          "certificate": null,
          "description": "O MySQL é um sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface. É atualmente um dos sistemas de gerenciamento de bancos de dados mais populares da Oracle Corporation, com mais de 10 milhões de instalações pelo mundo.",
          "created_at": "2022-12-22T18:18:48.000000Z",
          "updated_at": "2022-12-22T18:40:23.000000Z"
      },
      {
          "id": 24,
          "name": "API",
          "order": 11,
          "img": null,
          "skill_link": "https://stoplight.io/api-documentation-guide",
          "certificate": null,
          "description": "API significa Application Programming Interface (Interface de Programação de Aplicação). No contexto de APIs, a palavra Aplicação refere-se a qualquer software com uma função distinta. A interface pode ser pensada como um contrato de serviço entre duas aplicações.",
          "created_at": "2022-12-22T18:22:27.000000Z",
          "updated_at": "2022-12-22T18:40:23.000000Z"
      },
      {
          "id": 25,
          "name": "JWT",
          "order": 12,
          "img": "images/img/XOEaj24LY9c7fVEGIemuGFL24LlrVz35ormtjdjq.png",
          "skill_link": "https://jwt.io/",
          "certificate": null,
          "description": "O JSON Web Token é um padrão da Internet para a criação de dados com assinatura opcional e/ou criptografia cujo payload contém o JSON que afirma algum número de declarações. Os tokens são assinados usando um segredo privado ou uma chave pública/privada.",
          "created_at": "2022-12-22T18:22:58.000000Z",
          "updated_at": "2022-12-22T18:40:23.000000Z"
      },
      {
          "id": 26,
          "name": "MVC",
          "order": 13,
          "img": null,
          "skill_link": null,
          "certificate": null,
          "description": "O MVC é uma sigla do termo em inglês Model (modelo) View (visão) e Controller (Controle) que facilita a troca de informações entre a interface do usuário aos dados no banco, fazendo com que as respostas sejam mais rápidas e dinâmicas.",
          "created_at": "2022-12-22T18:29:48.000000Z",
          "updated_at": "2022-12-22T18:40:23.000000Z"
      },
      {
          "id": 27,
          "name": "Python",
          "order": 14,
          "img": "images/img/Ffr8981mVp6DtKuEYwEjrVvdcnZyIKPSPzMjoC1z.png",
          "skill_link": "https://www.python.org/",
          "certificate": null,
          "description": "Python é uma linguagem de programação de alto nível e de propósito geral. Sua filosofia de design enfatiza a legibilidade do código com o uso de recuo significativo. Python é tipado dinamicamente e coletado como lixo.",
          "created_at": "2022-12-22T18:30:30.000000Z",
          "updated_at": "2022-12-22T18:40:24.000000Z"
      },
      {
          "id": 28,
          "name": "GIT",
          "order": 15,
          "img": "images/img/vBBEYpJWffhQYiSMfHfMAA7t4aVdHAkitdmATIAe.png",
          "skill_link": "https://git-scm.com/",
          "certificate": null,
          "description": "O Git é um projeto de código aberto maduro e com manutenção ativa desenvolvido em 2005 por Linus Torvalds, o famoso criador do kernel do sistema operacional Linux. Um número impressionante de projetos de software depende do Git para controle de versão, incluindo projetos comerciais e de código-fonte aberto.",
          "created_at": "2022-12-22T18:32:11.000000Z",
          "updated_at": "2022-12-22T18:40:24.000000Z"
      },
      {
          "id": 29,
          "name": "GitHub",
          "order": 16,
          "img": "images/img/jonoBWgaSXMai3xeD3G7C2PNgOWmwicI94NUrS5b.webp",
          "skill_link": "https://github.com/LuanTenorio",
          "certificate": null,
          "description": "GitHub é uma plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git. Ele permite que programadores, utilitários ou qualquer usuário cadastrado na plataforma contribuam em projetos privados e/ou Open Source de qualquer lugar do mundo.",
          "created_at": "2022-12-22T18:33:38.000000Z",
          "updated_at": "2022-12-22T18:40:24.000000Z"
      },
      {
          "id": 33,
          "name": "Linux",
          "order": 17,
          "img": "images/img/rRyCSPBNEJblFQ3wtOWn6O7fGoWF7g8xKJa9TXHq.png",
          "skill_link": "https://linuxmint.com/",
          "certificate": null,
          "description": "Linux é um termo popularmente empregado para se referir a sistemas operativos ou sistemas operacionais que utilizam o Kernel Linux. O núcleo foi desenvolvido pelo programador finlandês Linus Torvalds, inspirado no sistema Minix. Linux Mint é uma distribuição Linux irlandesa. Possui duas versões: uma baseada em Ubuntu e outra versão baseada em Debian. Suporta muitos idiomas, incluindo a língua portuguesa, e utiliza o Cinnamon como seu principal ambiente de desktop.",
          "created_at": "2022-12-22T18:39:42.000000Z",
          "updated_at": "2022-12-24T02:20:29.000000Z"
      },
      {
          "id": 30,
          "name": "UI",
          "order": 18,
          "img": null,
          "skill_link": null,
          "certificate": null,
          "description": "Design de interface de utilizador ou engenharia de interface de utilizador é o desenvolvimento de computadores, aplicações, máquinas, dispositivos de comunicação móveis, softwares e sítios web com o foco na experiência do utilizadores e interação.",
          "created_at": "2022-12-22T18:34:33.000000Z",
          "updated_at": "2022-12-24T02:20:25.000000Z"
      },
      {
          "id": 31,
          "name": "UX",
          "order": 19,
          "img": null,
          "skill_link": null,
          "certificate": null,
          "description": "Para começar, UX significa “User Experience”, ou seja, experiência do usuário. Portanto, o UX Designer é aquele que precisa pensar e conceber todos os aspectos da interação entre o usuário e a experiência completa do produto, do início ao fim.",
          "created_at": "2022-12-22T18:34:55.000000Z",
          "updated_at": "2022-12-24T02:20:28.000000Z"
      },
      {
          "id": 32,
          "name": "Figma",
          "order": 20,
          "img": "images/img/zTKHFg8PGjDojlUhAg6I8WRBxjreLgHxetddWBpe.webp",
          "skill_link": "https://www.figma.com/",
          "certificate": null,
          "description": "Figma é um editor gráfico de vetor e prototipagem de projetos de design baseado principalmente no navegador web, com ferramentas offline adicionais para aplicações desktop para GNU/Linux, macOS e Windows.",
          "created_at": "2022-12-22T18:36:05.000000Z",
          "updated_at": "2022-12-24T02:20:29.000000Z"
      }
  ]

  localProjects: Project[] = [
      {
          "id": 9,
          "link": "https://www.luantenorio.com/",
          "description": "Uma Landing-page para ser usada como portfólio, mostrando uma pequena parte do meu conhecimento, e tendo minhas habilidades e projetos feitos.",
          "order": 1,
          "created_at": "2022-12-25T02:44:26.000000Z",
          "updated_at": "2022-12-25T02:52:05.000000Z",
          "images": [
              {
                  "id": 37,
                  "project_id": 9,
                  "order": 1,
                  "path": "images/projectCover/zuCgEog98fSfxVzzafvNFedygwHxmtTv2ubanULR.png",
                  "created_at": "2022-12-25T02:44:28.000000Z",
                  "updated_at": "2022-12-25T02:56:37.000000Z"
              },
              {
                  "id": 38,
                  "project_id": 9,
                  "order": 2,
                  "path": "images/projectCover/Z0PIXuWQr8gl4KBL9nWGQ7YBeBSG8VkNe9sXHlJm.png",
                  "created_at": "2022-12-25T02:44:29.000000Z",
                  "updated_at": "2022-12-25T02:56:37.000000Z"
              },
              {
                  "id": 39,
                  "project_id": 9,
                  "order": 3,
                  "path": "images/projectCover/8x9qn3QBYogU85ykatw7rwuFvs9W22nJoJufH2la.png",
                  "created_at": "2022-12-25T02:44:29.000000Z",
                  "updated_at": "2022-12-25T02:56:37.000000Z"
              },
              {
                  "id": 55,
                  "project_id": 9,
                  "order": 4,
                  "path": "images/projectCover/xxZ2qbsVOHuGUbvT3VKdkuC9KRhxGv4pnFe9WrZi.png",
                  "created_at": "2022-12-25T03:00:51.000000Z",
                  "updated_at": "2022-12-25T03:01:56.000000Z"
              },
              {
                  "id": 40,
                  "project_id": 9,
                  "order": 5,
                  "path": "images/projectCover/nu51djXbaHuc27hdQkPN2PvkaWFl84swmQoIKMYP.png",
                  "created_at": "2022-12-25T02:44:29.000000Z",
                  "updated_at": "2022-12-25T03:01:53.000000Z"
              },
              {
                  "id": 41,
                  "project_id": 9,
                  "order": 6,
                  "path": "images/projectCover/sFdT5CuwN28r99xM0OY60lQBmPmWjBvva0zrmai9.png",
                  "created_at": "2022-12-25T02:44:30.000000Z",
                  "updated_at": "2022-12-25T03:01:53.000000Z"
              },
              {
                  "id": 50,
                  "project_id": 9,
                  "order": 7,
                  "path": "images/projectCover/UXle5GlBCXuCPZSsmWNIKLObGqpcIWqWi9sP2QrT.png",
                  "created_at": "2022-12-25T02:54:30.000000Z",
                  "updated_at": "2022-12-25T03:04:54.000000Z"
              },
              {
                  "id": 52,
                  "project_id": 9,
                  "order": 8,
                  "path": "images/projectCover/GhbTCHcjcMgbyOokNt62BvIQ6tEzzc6l34I18DJT.png",
                  "created_at": "2022-12-25T02:54:32.000000Z",
                  "updated_at": "2022-12-25T03:04:54.000000Z"
              },
              {
                  "id": 53,
                  "project_id": 9,
                  "order": 9,
                  "path": "images/projectCover/f1rBjp6rwX8LQoyrkyQtCahPmdq9IDzWci2KDSZj.png",
                  "created_at": "2022-12-25T02:54:32.000000Z",
                  "updated_at": "2022-12-25T03:04:54.000000Z"
              },
              {
                  "id": 45,
                  "project_id": 9,
                  "order": 10,
                  "path": "images/projectCover/TcsUHqMwXeDmqHBtRTyGhfTKP8gOdyvZ99exDD3l.png",
                  "created_at": "2022-12-25T02:44:32.000000Z",
                  "updated_at": "2022-12-25T03:04:53.000000Z"
              },
              {
                  "id": 51,
                  "project_id": 9,
                  "order": 11,
                  "path": "images/projectCover/eRtskfgo95WoCTVPyRAFY8qwWx6v1sJB0a5TJ2tW.png",
                  "created_at": "2022-12-25T02:54:31.000000Z",
                  "updated_at": "2022-12-25T03:04:54.000000Z"
              },
              {
                  "id": 56,
                  "project_id": 9,
                  "order": 12,
                  "path": "images/projectCover/u8nNoZ1H9PJXaYFL8d1uJ16Kg7xIFixCULoC3SOV.png",
                  "created_at": "2022-12-25T03:03:59.000000Z",
                  "updated_at": "2022-12-25T03:04:55.000000Z"
              },
              {
                  "id": 42,
                  "project_id": 9,
                  "order": 13,
                  "path": "images/projectCover/NtNNEUShMxPo8q6Zkf6a5myOPCaqNp7iSd3XdNiT.png",
                  "created_at": "2022-12-25T02:44:31.000000Z",
                  "updated_at": "2022-12-25T03:04:51.000000Z"
              },
              {
                  "id": 43,
                  "project_id": 9,
                  "order": 14,
                  "path": "images/projectCover/ArCchPAnpGLiRJd2Xp2B1XG4EyP9adRN5TMD0uFm.png",
                  "created_at": "2022-12-25T02:44:31.000000Z",
                  "updated_at": "2022-12-25T03:04:52.000000Z"
              },
              {
                  "id": 44,
                  "project_id": 9,
                  "order": 15,
                  "path": "images/projectCover/jDi16b8H6u6GAlVWyW23h76gH32zHcYgUxg6F2D7.png",
                  "created_at": "2022-12-25T02:44:32.000000Z",
                  "updated_at": "2022-12-25T03:04:53.000000Z"
              },
              {
                  "id": 46,
                  "project_id": 9,
                  "order": 16,
                  "path": "images/projectCover/RiRFd4UkYHqgcnJ9omPbWKOXFAZOpUtc8PnbBgB6.png",
                  "created_at": "2022-12-25T02:44:32.000000Z",
                  "updated_at": "2022-12-25T03:04:53.000000Z"
              },
              {
                  "id": 47,
                  "project_id": 9,
                  "order": 17,
                  "path": "images/projectCover/QTAgou0k9naJrtWvkSisoL5dRYma45BEgLRKQghF.png",
                  "created_at": "2022-12-25T02:44:33.000000Z",
                  "updated_at": "2022-12-25T03:04:53.000000Z"
              },
              {
                  "id": 48,
                  "project_id": 9,
                  "order": 18,
                  "path": "images/projectCover/6wUWYABPdODGEY0jMdPsR5Xzcxd9SVAP7U3OTnsL.png",
                  "created_at": "2022-12-25T02:44:33.000000Z",
                  "updated_at": "2022-12-25T03:04:54.000000Z"
              },
              {
                  "id": 49,
                  "project_id": 9,
                  "order": 19,
                  "path": "images/projectCover/r2jmOhZnHmrUBXDvr5tbINjhnxOWYYLTejU2R167.png",
                  "created_at": "2022-12-25T02:44:33.000000Z",
                  "updated_at": "2022-12-25T03:04:54.000000Z"
              }
          ]
      },
      {
          "id": 2,
          "link": "linkkkkkkkkkkkkkkkkk",
          "description": "Um site feito para uma escola, varias funcionalidades como visualizar o cardápio da semana, as notas, os avisos, e um sistema de bibliotecário, com reserva de livros para manter um melhor controle da estante física, e claro um painel de controle para modificar as informações do site.",
          "order": 2,
          "created_at": "2022-12-17T22:28:44.000000Z",
          "updated_at": "2022-12-24T17:56:21.000000Z",
          "images": [
              {
                  "id": 2,
                  "project_id": 2,
                  "order": 1,
                  "path": "images/projectCover/n0M7FM8bhi8kgy310YaNgGLy4oQOuCfQGXNjPdLX.jpg",
                  "created_at": "2022-12-17T22:28:45.000000Z",
                  "updated_at": "2022-12-24T17:54:20.000000Z"
              },
              {
                  "id": 3,
                  "project_id": 2,
                  "order": 2,
                  "path": "images/projectCover/kNslcPHb0yIloZ63obx8aIfknQSBrOk9lEsaxiBG.jpg",
                  "created_at": "2022-12-17T22:28:46.000000Z",
                  "updated_at": "2022-12-24T17:54:20.000000Z"
              },
              {
                  "id": 4,
                  "project_id": 2,
                  "order": 3,
                  "path": "images/projectCover/a2UNmjsxlZlB6fLCo22dZb5vdO1KBVY7cH5rqNAs.jpg",
                  "created_at": "2022-12-17T22:28:46.000000Z",
                  "updated_at": "2022-12-24T17:54:20.000000Z"
              },
              {
                  "id": 1,
                  "project_id": 2,
                  "order": 4,
                  "path": "images/projectCover/ecUt7KElEJdwU1yYyrUofLDMSXYHYJChdvf8tv7C.jpg",
                  "created_at": "2022-12-17T22:28:45.000000Z",
                  "updated_at": "2022-12-24T17:54:20.000000Z"
              },
              {
                  "id": 5,
                  "project_id": 2,
                  "order": 5,
                  "path": "images/projectCover/I3VdZldnEqoUbMkTFuDfBYB8b3tDTLIFH8nZidwQ.jpg",
                  "created_at": "2022-12-17T22:28:46.000000Z",
                  "updated_at": "2022-12-24T17:43:56.000000Z"
              },
              {
                  "id": 6,
                  "project_id": 2,
                  "order": 6,
                  "path": "images/projectCover/2uA8dlM0gQEFXqFa47Af3IhA47oXj8jAjiQiZo7Y.jpg",
                  "created_at": "2022-12-17T22:28:46.000000Z",
                  "updated_at": "2022-12-24T17:43:56.000000Z"
              },
              {
                  "id": 7,
                  "project_id": 2,
                  "order": 7,
                  "path": "images/projectCover/Gd4z35nDT0RJHFDWQRnn0CmbfqQNdnuHxhCjqgHH.jpg",
                  "created_at": "2022-12-17T22:28:46.000000Z",
                  "updated_at": "2022-12-24T17:43:56.000000Z"
              },
              {
                  "id": 8,
                  "project_id": 2,
                  "order": 8,
                  "path": "images/projectCover/xhaCEWIn8XKAfDI5RhS29XLzmBzopoKS6VBn26gz.jpg",
                  "created_at": "2022-12-17T22:28:46.000000Z",
                  "updated_at": "2022-12-24T17:43:56.000000Z"
              },
              {
                  "id": 9,
                  "project_id": 2,
                  "order": 9,
                  "path": "images/projectCover/nkERarIa3YKx8aSgHxGX62ngmTshwaNELVD8qaO1.jpg",
                  "created_at": "2022-12-17T22:28:46.000000Z",
                  "updated_at": "2022-12-24T17:43:56.000000Z"
              },
              {
                  "id": 10,
                  "project_id": 2,
                  "order": 10,
                  "path": "images/projectCover/KI7bchdA92cw1suUwhHU5jyaAzox2o2cjpYElT53.jpg",
                  "created_at": "2022-12-17T22:28:47.000000Z",
                  "updated_at": "2022-12-24T17:43:57.000000Z"
              },
              {
                  "id": 11,
                  "project_id": 2,
                  "order": 11,
                  "path": "images/projectCover/SGQgYEfYhWTgJ2Symzk45bOt5iWJcRhusdVbEDAO.jpg",
                  "created_at": "2022-12-17T22:28:47.000000Z",
                  "updated_at": "2022-12-24T17:43:57.000000Z"
              },
              {
                  "id": 12,
                  "project_id": 2,
                  "order": 12,
                  "path": "images/projectCover/tKQLvw9YDG9BtZgYfsrVlCMhE1iOKnpkvDwi8agW.jpg",
                  "created_at": "2022-12-17T22:28:47.000000Z",
                  "updated_at": "2022-12-24T17:43:57.000000Z"
              },
              {
                  "id": 13,
                  "project_id": 2,
                  "order": 13,
                  "path": "images/projectCover/giYRNLi51vKThAh5OFlHMI7e06ycX1AtefbLxvwQ.jpg",
                  "created_at": "2022-12-17T22:28:47.000000Z",
                  "updated_at": "2022-12-24T17:43:57.000000Z"
              },
              {
                  "id": 14,
                  "project_id": 2,
                  "order": 14,
                  "path": "images/projectCover/591jywE1gFo7lj1iezyNt51keOUjhNksCJbJjE84.jpg",
                  "created_at": "2022-12-17T22:28:47.000000Z",
                  "updated_at": "2022-12-24T17:43:57.000000Z"
              },
              {
                  "id": 15,
                  "project_id": 2,
                  "order": 15,
                  "path": "images/projectCover/wExYiZwoKkXw39qKrU6un6eajiMZ0SMnc8Mv61sN.jpg",
                  "created_at": "2022-12-17T22:28:47.000000Z",
                  "updated_at": "2022-12-24T17:43:57.000000Z"
              },
              {
                  "id": 16,
                  "project_id": 2,
                  "order": 16,
                  "path": "images/projectCover/DqIYwbZ4eBuszUogvfJI1LNB56OW10TJNBUDGsK7.jpg",
                  "created_at": "2022-12-17T22:28:48.000000Z",
                  "updated_at": "2022-12-24T17:43:57.000000Z"
              },
              {
                  "id": 17,
                  "project_id": 2,
                  "order": 17,
                  "path": "images/projectCover/Q3lK8sA9TXLGGMsdjySfuZVgZcOom7DUsZbKcSOt.jpg",
                  "created_at": "2022-12-17T22:28:48.000000Z",
                  "updated_at": "2022-12-24T17:43:58.000000Z"
              },
              {
                  "id": 18,
                  "project_id": 2,
                  "order": 18,
                  "path": "images/projectCover/hqSm23kG0879NizOy5VOGU1FjzmIV6kGML76KH51.jpg",
                  "created_at": "2022-12-17T22:28:48.000000Z",
                  "updated_at": "2022-12-24T17:43:58.000000Z"
              },
              {
                  "id": 19,
                  "project_id": 2,
                  "order": 19,
                  "path": "images/projectCover/qAPdO3o3gKHMqo6BWjq5T6o2HJmbzsvto6UbWd66.jpg",
                  "created_at": "2022-12-17T22:28:48.000000Z",
                  "updated_at": "2022-12-24T17:43:58.000000Z"
              }
          ]
      }
  ]

  localInfos: Info = {
      "id": 1,
      "github_link": "https://github.com/LuanTenorio",
      "linkedin_link": "https://www.linkedin.com/in/lluantenorio",
      "instagram_link": "https://www.instagram.com/lluantenorio/",
      "name": "Thierry Luan Tenório de Jesus",
      "email": "lluantenorio7@gmail.com",
      "description": "Entrei no mundo da programação de forma mais intensa no início de 2021, primeiro foi python, depois fui estudando o básico de front-end, HTML, CSS, Javascript e Jquery, então fui visitar o mundo back-end com PHP e SQL. Logo fui estudar o framework Angular, assim reforçando meus aprendizados ainda mais em HTML, CSS,  e me apaixonando no Typescript. Estudei também o Laravel, um maravilhoso framework PHP, e foi nele que aprendi diversos conceitos importantíssimos, na prática, como a arquitetura MVC, o meio de comunicação por API e seu método de segurança JWT. Como é de se esperar, quando um projeto fica grande demais, demanda algumas séries de organizações mais robustas, por isso aprendi GIT, e para fazer layouts lindos, uso o sistema do Figma.",
      "cover": "images/info/HhGTf8BNa8DSZfeMwRgWSsvN2L9MgXRHyxVR7hTX.jpg",
      "created_at": null,
      "updated_at": "2022-12-25T00:37:52.000000Z"
  }

}
