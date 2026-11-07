package com.example.data.repository

import com.example.data.api.GeminiService
import com.example.data.api.StructuralFeedback
import com.example.data.model.ClassRollStudent
import com.example.data.model.CompetencyScore
import com.example.data.model.CorrectionStep
import com.example.data.model.CourseMetrics
import com.example.data.model.EssayDraft
import com.example.data.model.EssayEvaluation
import com.example.data.model.EvolutionItem
import com.example.data.model.ParentViewData
import com.example.data.model.RepertoryCard
import com.example.data.model.StudentProfile
import com.example.data.model.TeacherEssayItem
import com.example.data.model.ThemeConfig
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class EssayRepository(
  private val geminiService: GeminiService = GeminiService()
) {

  private val _studentProfile = MutableStateFlow(StudentProfile())
  val studentProfile: StateFlow<StudentProfile> = _studentProfile.asStateFlow()

  private val initialDraftText =
    "Na sociedade contemporânea, o uso intenso das redes sociais tem alterado a forma como os jovens se relacionam consigo mesmos e com os outros. Nesse contexto, a comparação constante com vidas editadas contribui para o aumento da ansiedade, o que evidencia um problema que exige atenção coletiva."

  private val _currentDraft = MutableStateFlow(
    EssayDraft(
      theme = "Saúde mental dos jovens na era digital",
      text = initialDraftText,
      lastSaved = "Salvo há 2 min"
    )
  )
  val currentDraft: StateFlow<EssayDraft> = _currentDraft.asStateFlow()

  private val defaultRepertories = listOf(
    RepertoryCard(
      id = "rep_1",
      badge = "CONCEITO · COMPETÊNCIA 2",
      title = "Modernidade líquida",
      authorYear = "Zygmunt Bauman, 2000",
      description = "Ideia de que vínculos, trabalho e consumo se tornaram instáveis e passageiros na sociedade contemporânea.",
      howToUse = "Em temas sobre redes sociais, relações e consumo. Adapte ao tema, não copie a frase.",
      source = "Bauman, Z. (2000). Modernidade Líquida. Zahar.",
      isSaved = true
    ),
    RepertoryCard(
      id = "rep_2",
      badge = "FILOSOFIA · COMPETÊNCIA 2",
      title = "Sociedade do Cansaço",
      authorYear = "Byung-Chul Han, 2010",
      description = "O indivíduo contemporâneo explora a si mesmo na ilusão de liberdade, gerando exaustão psíquica e depressão generalizada.",
      howToUse = "Ideal para discutir sobrecarga digital, hiperconectividade e pressão por produtividade entre jovens.",
      source = "Han, B.-C. (2010). Sociedade do Cansaço. Vozes.",
      isSaved = false
    ),
    RepertoryCard(
      id = "rep_3",
      badge = "CONSTITUIÇÃO · COMPETÊNCIA 2 e 5",
      title = "Direito Fundamental à Saúde",
      authorYear = "CF/88, Artigo 196",
      description = "A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas.",
      howToUse = "Use para fundamentar a proposta de intervenção de saúde mental integrada ao ambiente escolar.",
      source = "Constituição da República Federativa do Brasil de 1988.",
      isSaved = false
    ),
    RepertoryCard(
      id = "rep_4",
      badge = "SOCIOLOGIA · COMPETÊNCIA 3",
      title = "Cidadãos de Papel",
      authorYear = "Gilberto Dimenstein, 1993",
      description = "Denúncia de que direitos previstos nas leis muitas vezes não se concretizam na vida real de jovens e vulneráveis.",
      howToUse = "Para criticar a ineficácia governamental diante do apoio psicológico nas redes públicas.",
      source = "Dimenstein, G. (1993). O Cidadão de Papel. Ática.",
      isSaved = false
    ),
    RepertoryCard(
      id = "rep_5",
      badge = "TECNOLOGIA · COMPETÊNCIA 2",
      title = "O Dilema das Redes",
      authorYear = "Jeff Orlowski, 2020",
      description = "Algoritmos desenhados para retenção e engajamento induzem padrões de comparação social e gatilhos de ansiedade.",
      howToUse = "Excelente para fundamentar impactos diretos das plataformas digitais na saúde psicológica juvenil.",
      source = "Documentário Netflix: The Social Dilemma (2020).",
      isSaved = false
    )
  )

  private val _repertories = MutableStateFlow(defaultRepertories)
  val repertories: StateFlow<List<RepertoryCard>> = _repertories.asStateFlow()

  private val _viewedCardsCount = MutableStateFlow(3)
  val viewedCardsCount: StateFlow<Int> = _viewedCardsCount.asStateFlow()

  private val _currentEvaluation = MutableStateFlow(EssayEvaluation())
  val currentEvaluation: StateFlow<EssayEvaluation> = _currentEvaluation.asStateFlow()

  private val _evolutionItems = MutableStateFlow(
    listOf(
      EvolutionItem("R1", 640, "Desafios da mobilidade urbana", "08/Ago"),
      EvolutionItem("R2", 680, "Inclusão digital e mercado de trabalho", "22/Ago"),
      EvolutionItem("R3", 700, "Preservação da memória cultural", "05/Set"),
      EvolutionItem("R4", 720, "Combate ao desperdício alimentar", "19/Set"),
      EvolutionItem("R5", 740, "Inteligência artificial na educação", "03/Out"),
      EvolutionItem("R6", 760, "Saúde mental dos jovens na era digital", "17/Out")
    )
  )
  val evolutionItems: StateFlow<List<EvolutionItem>> = _evolutionItems.asStateFlow()

  // Teacher submissions queue
  private val _teacherQueue = MutableStateFlow(
    listOf(
      TeacherEssayItem(
        id = "sub_marina_1",
        studentName = "Marina Silva",
        studentClass = "Extensivo ENEM - Sala 14",
        theme = "Saúde mental dos jovens na era digital",
        submittedAt = "Hoje, 09:12 · Versão 1",
        text = initialDraftText,
        aiScore = 760,
        status = CorrectionStep.PROFESSOR,
        c1 = 160,
        c2 = 120,
        c3 = 160,
        c4 = 160,
        c5 = 160,
        teacherNotes = "Observação de plantão: repertório precisa ser articulado com a tese antes da entrega final."
      ),
      TeacherEssayItem(
        id = "sub_lucas_2",
        studentName = "Lucas Mendes",
        studentClass = "Extensivo ENEM - Sala 14",
        theme = "Saúde mental dos jovens na era digital",
        submittedAt = "Ontem, 18:40 · Versão 1",
        text = "Desde a Revolução Técnico-Científica-Informacional, a internet modificou o comportamento juvenil. Contudo, o excesso de telas desencadeou patologias mentais.",
        aiScore = 800,
        status = CorrectionStep.PROFESSOR,
        c1 = 160,
        c2 = 160,
        c3 = 160,
        c4 = 160,
        c5 = 160,
        teacherNotes = "Boa citação de Milton Santos."
      ),
      TeacherEssayItem(
        id = "sub_beatriz_3",
        studentName = "Beatriz Oliveira",
        studentClass = "Extensivo ENEM - Sala 14",
        theme = "Saúde mental dos jovens na era digital",
        submittedAt = "04/Nov, 14:15 · Versão 2",
        text = "A Constituição Federal de 1988 assegura o bem-estar psicológico e físico como direitos intransferíveis.",
        aiScore = 920,
        officialScore = 920,
        status = CorrectionStep.PRONTA,
        c1 = 200,
        c2 = 160,
        c3 = 160,
        c4 = 200,
        c5 = 200,
        teacherNotes = "Parabéns Beatriz! Excelente proposta de intervenção completa com 5 elementos.",
        isApprovedByTeacher = true
      )
    )
  )
  val teacherQueue: StateFlow<List<TeacherEssayItem>> = _teacherQueue.asStateFlow()

  // Class roll attendance for Saturday class
  private val _classRoll = MutableStateFlow(
    listOf(
      ClassRollStudent("1", "Marina Silva", "001", true),
      ClassRollStudent("2", "Lucas Mendes", "002", true),
      ClassRollStudent("3", "Beatriz Oliveira", "003", true),
      ClassRollStudent("4", "Gabriel Costa", "004", false),
      ClassRollStudent("5", "Camila Ramos", "005", true),
      ClassRollStudent("6", "Enzo Ribeiro", "006", true),
      ClassRollStudent("7", "Larissa Souza", "007", true),
      ClassRollStudent("8", "Thiago Martins", "008", false)
    )
  )
  val classRoll: StateFlow<List<ClassRollStudent>> = _classRoll.asStateFlow()

  // Parent View Data
  private val _parentData = MutableStateFlow(ParentViewData())
  val parentData: StateFlow<ParentViewData> = _parentData.asStateFlow()

  // Admin Metrics & Themes
  private val _adminMetrics = MutableStateFlow(CourseMetrics())
  val adminMetrics: StateFlow<CourseMetrics> = _adminMetrics.asStateFlow()

  private val _themesList = MutableStateFlow(
    listOf(
      ThemeConfig("theme_1", "Saúde mental dos jovens na era digital", "Saúde e Tecnologia", "Sexta, 23h59", true),
      ThemeConfig("theme_2", "Impactos do agronegócio e segurança alimentar", "Meio Ambiente e Economia", "14/Nov", false),
      ThemeConfig("theme_3", "Invisibilidade do trabalho de cuidado no Brasil", "Sociedade e Direitos", "21/Nov", false)
    )
  )
  val themesList: StateFlow<List<ThemeConfig>> = _themesList.asStateFlow()

  fun updateDraftText(newText: String) {
    _currentDraft.update {
      it.copy(
        text = newText,
        lastSaved = "Salvo agora"
      )
    }
  }

  suspend fun analyzeWithGemini(theme: String, text: String): StructuralFeedback {
    val feedback = geminiService.analyzeEssayStructure(theme, text)

    _currentEvaluation.update {
      it.copy(
        theme = theme,
        totalEstimatedScore = feedback.totalScore,
        competencies = feedback.competencies,
        attentionPoint = feedback.pontoAtencao,
        structuralDetails = "Introdução: ${feedback.introducaoFeedback}\n\nDesenvolvimento: ${feedback.d1Feedback}\n\nProposta: ${feedback.conclusaoFeedback}"
      )
    }
    return feedback
  }

  fun toggleSaveRepertory(id: String) {
    _repertories.update { list ->
      list.map { item ->
        if (item.id == id) item.copy(isSaved = !item.isSaved) else item
      }
    }
  }

  fun insertRepertoryIntoDraft(title: String, author: String) {
    val insertion = "\n\nConforme elucida $author em \"$title\", "
    _currentDraft.update {
      it.copy(
        text = it.text + insertion,
        lastSaved = "Salvo agora"
      )
    }
  }

  fun submitDraftForCorrection() {
    val lineCount = calculateEstimatedLines(_currentDraft.value.text)
    val hasBauman = _currentDraft.value.text.contains("Bauman", ignoreCase = true) ||
        _currentDraft.value.text.contains("líquida", ignoreCase = true) ||
        _currentDraft.value.text.contains("sociedade", ignoreCase = true)

    val c2Score = if (hasBauman && lineCount >= 18) 160 else 120
    val totalScore = 160 + c2Score + 160 + 160 + 160

    _currentEvaluation.update {
      it.copy(
        theme = _currentDraft.value.theme,
        submissionTime = "Hoje, 09:12 · Versão 1",
        totalEstimatedScore = totalScore,
        currentStep = CorrectionStep.PROFESSOR,
        competencies = listOf(
          CompetencyScore("C1", "Norma culta", 160, 200, "+20"),
          CompetencyScore(
            code = "C2",
            name = "Tema e repertório",
            score = c2Score,
            maxScore = 200,
            delta = if (c2Score >= 160) "+40" else "atenção",
            isAttention = c2Score < 160,
            feedback = if (c2Score >= 160) "Excelente uso do repertório sociocultural produtivo e legitimado!" else "Seu repertório apareceu pouco desenvolvido. Que tal ligar uma ideia sociológica ao tema?"
          ),
          CompetencyScore("C3", "Argumentação", 160, 200, "+40"),
          CompetencyScore("C4", "Coesão", 160, 200, "+20"),
          CompetencyScore("C5", "Proposta de intervenção", 160, 200, "+40")
        ),
        attentionPoint = if (c2Score < 160)
          "Seu repertório apareceu pouco desenvolvido. Que tal ligar uma ideia sociológica ao tema?"
        else
          "Texto bem articulado. Mantenha os conectivos interparágrafos consistentes."
      )
    }

    // Also add or update the submission in teacher's queue
    _teacherQueue.update { list ->
      val updated = list.toMutableList()
      val idx = updated.indexOfFirst { it.id == "sub_marina_1" }
      val item = TeacherEssayItem(
        id = "sub_marina_1",
        studentName = "Marina Silva",
        studentClass = "Extensivo ENEM - Sala 14",
        theme = _currentDraft.value.theme,
        submittedAt = "Hoje, 09:12 · Versão 1",
        text = _currentDraft.value.text,
        aiScore = totalScore,
        status = CorrectionStep.PROFESSOR,
        c1 = 160,
        c2 = c2Score,
        c3 = 160,
        c4 = 160,
        c5 = 160,
        teacherNotes = "Texto recebido para validação oficial do professor."
      )
      if (idx >= 0) {
        updated[idx] = item
      } else {
        updated.add(0, item)
      }
      updated
    }
  }

  // Teacher actions
  fun publishTeacherCorrection(
    essayId: String,
    c1: Int,
    c2: Int,
    c3: Int,
    c4: Int,
    c5: Int,
    notes: String
  ) {
    val total = c1 + c2 + c3 + c4 + c5
    _teacherQueue.update { list ->
      list.map { item ->
        if (item.id == essayId) {
          item.copy(
            c1 = c1, c2 = c2, c3 = c3, c4 = c4, c5 = c5,
            officialScore = total,
            status = CorrectionStep.PRONTA,
            teacherNotes = notes,
            isApprovedByTeacher = true
          )
        } else item
      }
    }

    // If it was Marina's essay, update student evaluation to PRONTA
    if (essayId == "sub_marina_1") {
      _currentEvaluation.update {
        it.copy(
          currentStep = CorrectionStep.PRONTA,
          totalEstimatedScore = total,
          competencies = listOf(
            CompetencyScore("C1", "Norma culta", c1, 200, "+20"),
            CompetencyScore("C2", "Tema e repertório", c2, 200, if (c2 >= 160) "+40" else "atenção", isAttention = c2 < 160),
            CompetencyScore("C3", "Argumentação", c3, 200, "+40"),
            CompetencyScore("C4", "Coesão", c4, 200, "+20"),
            CompetencyScore("C5", "Proposta de intervenção", c5, 200, "+40")
          ),
          attentionPoint = if (notes.isNotBlank()) notes else "Correção oficial validada pelo Prof. Guilherme Ramos na Sala 14."
        )
      }
    }
  }

  fun toggleStudentAttendance(studentId: String) {
    _classRoll.update { list ->
      list.map { student ->
        if (student.id == studentId) student.copy(isPresent = !student.isPresent) else student
      }
    }
  }

  fun markCardViewed() {
    if (_viewedCardsCount.value < 5) {
      _viewedCardsCount.update { it + 1 }
    }
  }

  fun addNewTheme(title: String, category: String, deadline: String) {
    val newTheme = ThemeConfig(
      id = "theme_${System.currentTimeMillis()}",
      title = title,
      category = category,
      deadline = deadline,
      isActive = true
    )
    _themesList.update { list ->
      list.map { it.copy(isActive = false) } + newTheme
    }
    _currentDraft.update { it.copy(theme = title) }
  }

  companion object {
    fun calculateEstimatedLines(text: String): Int {
      if (text.isBlank()) return 0
      val lines = text.split("\n")
      var total = 0
      for (l in lines) {
        val count = kotlin.math.max(1, (l.length + 55) / 58)
        total += count
      }
      return total.coerceIn(1, 30)
    }
  }
}
