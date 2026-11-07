package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowForwardIos
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.CompetencyScore
import com.example.data.model.EvolutionItem
import com.example.ui.components.EvolutionChart
import com.example.ui.theme.BorderLight
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkLightBorder
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun EvolucaoScreen(
  items: List<EvolutionItem>,
  competencies: List<CompetencyScore>,
  onCompetencyClick: (CompetencyScore) -> Unit = {},
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()
  var showAttendanceModal by remember { mutableStateOf(false) }
  var selectedItemDetail by remember { mutableStateOf<EvolutionItem?>(null) }

  val latestScore = items.lastOrNull()?.score ?: 760
  val firstScore = items.firstOrNull()?.score ?: 640
  val scoreDiff = latestScore - firstScore

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 16.dp, bottom = 100.dp)
  ) {
    // Header
    Text(
      text = "Últimas ${items.size} redações",
      color = TextSecondary,
      fontSize = 14.sp
    )
    Spacer(modifier = Modifier.height(2.dp))
    Text(
      text = "Minha evolução",
      color = TextPrimary,
      fontSize = 26.sp,
      fontWeight = FontWeight.Bold
    )

    Spacer(modifier = Modifier.height(22.dp))

    // Score and Delta Highlight
    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      Text(
        text = "$latestScore",
        color = TextPrimary,
        fontSize = 38.sp,
        fontWeight = FontWeight.Bold,
        modifier = Modifier.testTag("evolucao_latest_score")
      )

      Text(
        text = "nota mais recente",
        color = TextSecondary,
        fontSize = 14.sp
      )

      Spacer(modifier = Modifier.weight(1f))

      // Pill: +120 desde a 1ª
      Box(
        modifier = Modifier
          .clip(RoundedCornerShape(14.dp))
          .background(PinkLight)
          .padding(horizontal = 10.dp, vertical = 5.dp)
      ) {
        Text(
          text = "+$scoreDiff desde a 1ª",
          color = PinkPrimary,
          fontSize = 12.sp,
          fontWeight = FontWeight.Bold
        )
      }
    }

    Spacer(modifier = Modifier.height(18.dp))

    // Interactive Evolution Line Chart
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
      shadowElevation = 1.dp
    ) {
      Box(modifier = Modifier.padding(vertical = 18.dp)) {
        EvolutionChart(
          items = items,
          onItemSelected = { selectedItemDetail = it }
        )
      }
    }

    Spacer(modifier = Modifier.height(28.dp))

    // Section "Por competência"
    Text(
      text = "Por competência",
      color = TextPrimary,
      fontSize = 18.sp,
      fontWeight = FontWeight.Bold
    )

    Spacer(modifier = Modifier.height(14.dp))

    // Horizontal Row of Competency Cards (C1 to C5)
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
      competencies.forEach { comp ->
        val isAttention = comp.isAttention
        Surface(
          modifier = Modifier
            .weight(1f)
            .height(110.dp)
            .clip(RoundedCornerShape(16.dp))
            .clickable { onCompetencyClick(comp) }
            .testTag("card_competencia_${comp.code}"),
          shape = RoundedCornerShape(16.dp),
          color = if (isAttention) Color(0xFFFFF0F5) else Color.White,
          border = androidx.compose.foundation.BorderStroke(
            width = if (isAttention) 1.5.dp else 1.dp,
            color = if (isAttention) PinkLightBorder else BorderLight
          )
        ) {
          Column(
            modifier = Modifier
              .fillMaxSize()
              .padding(vertical = 10.dp, horizontal = 4.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
          ) {
            Text(
              text = comp.code,
              color = if (isAttention) PinkPrimary else TextSecondary,
              fontSize = 13.sp,
              fontWeight = FontWeight.Bold
            )

            Text(
              text = "${comp.score}",
              color = TextPrimary,
              fontSize = 20.sp,
              fontWeight = FontWeight.Bold
            )

            Text(
              text = comp.delta,
              color = if (isAttention) PinkPrimary else Color(0xFF10B981),
              fontSize = 12.sp,
              fontWeight = FontWeight.SemiBold
            )
          }
        }
      }
    }

    Spacer(modifier = Modifier.height(24.dp))

    // Section "FREQUÊNCIA" (Dark Card)
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(20.dp))
        .clickable { showAttendanceModal = true }
        .testTag("card_frequencia"),
      shape = RoundedCornerShape(20.dp),
      color = DarkCardBg
    ) {
      Row(
        modifier = Modifier
          .fillMaxWidth()
          .padding(20.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Column {
          Text(
            text = "FREQUÊNCIA",
            color = PinkPrimary,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 0.8.sp
          )
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "11 de 12 aulas neste mês",
            color = Color.White,
            fontSize = 17.sp,
            fontWeight = FontWeight.Bold
          )
        }

        Icon(
          imageVector = Icons.AutoMirrored.Outlined.ArrowForwardIos,
          contentDescription = "Ver presenças",
          tint = Color(0xFF9CA3AF),
          modifier = Modifier.size(16.dp)
        )
      }
    }
  }

  // Attendance Detail Modal
  if (showAttendanceModal) {
    AlertDialog(
      onDismissRequest = { showAttendanceModal = false },
      title = {
        Text("Frequência do Curso Presencial", fontWeight = FontWeight.Bold, color = PinkPrimary)
      },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
          Text("Aluno: Marina Silva (Turma Extensivo ENEM)")
          Text("Local: Unidade Central · Sala 14")
          Text("Índice de presença: 91,6% (11 de 12 aulas presenciais)")
          Spacer(modifier = Modifier.height(4.dp))
          val attendanceDates = listOf(
            "04/Out - Aula de Repertório: Presente",
            "11/Out - Oficina de Proposta de Intervenção: Presente",
            "18/Out - Simulado Presencial: Presente",
            "25/Out - Plantão de Dúvidas: Justificada"
          )
          attendanceDates.forEach { record ->
            Row(
              verticalAlignment = Alignment.CenterVertically,
              horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
              Icon(
                imageVector = Icons.Outlined.CheckCircle,
                contentDescription = null,
                tint = if (record.contains("Presente")) Color(0xFF10B981) else Color(0xFFF59E0B),
                modifier = Modifier.size(16.dp)
              )
              Text(record, fontSize = 13.sp, color = TextPrimary)
            }
          }
        }
      },
      confirmButton = {
        TextButton(onClick = { showAttendanceModal = false }) {
          Text("Fechar", color = PinkPrimary)
        }
      }
    )
  }

  // Selected Essay detail from chart
  selectedItemDetail?.let { item ->
    AlertDialog(
      onDismissRequest = { selectedItemDetail = null },
      title = { Text("${item.code}: ${item.score} pontos", fontWeight = FontWeight.Bold) },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
          Text("Tema: ${item.theme}")
          Text("Data de entrega: ${item.date}")
          Text("Status: Corrigida pelo professor com feedback arquivado.")
        }
      },
      confirmButton = {
        TextButton(onClick = { selectedItemDetail = null }) {
          Text("OK", color = PinkPrimary)
        }
      }
    )
  }
}
