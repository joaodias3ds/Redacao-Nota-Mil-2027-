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
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.OutlinedButton
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.CompetencyScore
import com.example.data.model.EssayEvaluation
import com.example.ui.theme.BorderLight
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun PreCorrecaoScreen(
  evaluation: EssayEvaluation,
  onBack: () -> Unit,
  onViewRepertories: () -> Unit,
  onRewrite: () -> Unit,
  onRequestReview: () -> Unit,
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()
  var showReviewDialog by remember { mutableStateOf(false) }

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .statusBarsPadding()
      .navigationBarsPadding()
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 10.dp, bottom = 24.dp)
  ) {
    // Top Bar
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(bottom = 16.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      IconButton(
        onClick = onBack,
        modifier = Modifier
          .size(40.dp)
          .testTag("pre_correcao_back")
      ) {
        Icon(
          imageVector = Icons.AutoMirrored.Outlined.ArrowBack,
          contentDescription = "Voltar",
          tint = TextPrimary
        )
      }
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        text = "Pré-correção",
        color = TextPrimary,
        fontSize = 19.sp,
        fontWeight = FontWeight.Bold
      )
    }

    // Magenta Score Banner Card
    Card(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(24.dp)),
      shape = RoundedCornerShape(24.dp),
      colors = CardDefaults.cardColors(containerColor = PinkPrimary),
      elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
      Row(
        modifier = Modifier
          .fillMaxWidth()
          .background(
            brush = Brush.verticalGradient(
              colors = listOf(
                PinkPrimary,
                Color(0xFF9E0043)
              )
            )
          )
          .padding(20.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Column(modifier = Modifier.weight(1f)) {
          Box(
            modifier = Modifier
              .clip(RoundedCornerShape(12.dp))
              .background(Color.White.copy(alpha = 0.22f))
              .padding(horizontal = 10.dp, vertical = 4.dp)
          ) {
            Text(
              text = "NOTA ESTIMADA · IA",
              color = Color.White,
              fontSize = 11.sp,
              fontWeight = FontWeight.Bold,
              letterSpacing = 0.5.sp
            )
          }

          Spacer(modifier = Modifier.height(10.dp))

          Text(
            text = "A nota oficial vem do\nprofessor",
            color = Color.White.copy(alpha = 0.95f),
            fontSize = 13.sp,
            lineHeight = 18.sp
          )
        }

        // Score display: 760 /1000
        Row(verticalAlignment = Alignment.Bottom) {
          Text(
            text = "${evaluation.totalEstimatedScore}",
            color = Color.White,
            fontSize = 42.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.testTag("score_estimated_value")
          )
          Text(
            text = "/${evaluation.maxScore}",
            color = Color.White.copy(alpha = 0.85f),
            fontSize = 18.sp,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.padding(bottom = 6.dp, start = 2.dp)
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Competencies Breakdown Card
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
      shadowElevation = 1.dp
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
      ) {
        evaluation.competencies.forEach { comp ->
          CompetencyItemRow(comp = comp)
        }
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Dark Card: PONTO DE ATENÇÃO · C2
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(20.dp),
      color = DarkCardBg
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(20.dp)
      ) {
        Text(
          text = "PONTO DE ATENÇÃO · ${evaluation.attentionCompetency}",
          color = PinkPrimary,
          fontSize = 12.sp,
          fontWeight = FontWeight.Bold,
          letterSpacing = 0.8.sp
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
          text = evaluation.attentionPoint,
          color = Color(0xFFEDEDED),
          fontSize = 15.sp,
          lineHeight = 22.sp
        )

        Spacer(modifier = Modifier.height(18.dp))

        // Button: "Ver repertórios para este tema"
        Button(
          onClick = onViewRepertories,
          modifier = Modifier
            .fillMaxWidth()
            .height(48.dp)
            .testTag("btn_ver_repertorios_tema"),
          shape = RoundedCornerShape(24.dp),
          colors = ButtonDefaults.buttonColors(
            containerColor = Color.White,
            contentColor = TextPrimary
          )
        ) {
          Text(
            text = "Ver repertórios para este tema",
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(28.dp))

    // Action Buttons: Pedir revisão & Reescrever
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
      // "Pedir revisão"
      OutlinedButton(
        onClick = { showReviewDialog = true },
        modifier = Modifier
          .weight(1f)
          .height(52.dp)
          .testTag("btn_pedir_revisao"),
        shape = RoundedCornerShape(26.dp),
        border = androidx.compose.foundation.BorderStroke(1.5.dp, PinkPrimary),
        colors = ButtonDefaults.outlinedButtonColors(contentColor = PinkPrimary)
      ) {
        Text(
          text = "Pedir revisão",
          fontSize = 15.sp,
          fontWeight = FontWeight.SemiBold
        )
      }

      // "Reescrever"
      Button(
        onClick = onRewrite,
        modifier = Modifier
          .weight(1f)
          .height(52.dp)
          .testTag("btn_reescrever"),
        shape = RoundedCornerShape(26.dp),
        colors = ButtonDefaults.buttonColors(
          containerColor = PinkPrimary,
          contentColor = Color.White
        )
      ) {
        Text(
          text = "Reescrever",
          fontSize = 15.sp,
          fontWeight = FontWeight.SemiBold
        )
      }
    }
  }

  if (showReviewDialog) {
    AlertDialog(
      onDismissRequest = { showReviewDialog = false },
      title = { Text("Solicitação de Revisão Presencial") },
      text = {
        Text("Deseja pedir prioridade ao Prof. Guilherme Ramos na próxima aula de sábado para discutir esta redação em plantão individual?")
      },
      confirmButton = {
        Button(
          onClick = {
            showReviewDialog = false
            onRequestReview()
          },
          colors = ButtonDefaults.buttonColors(containerColor = PinkPrimary)
        ) {
          Text("Confirmar pedido")
        }
      },
      dismissButton = {
        TextButton(onClick = { showReviewDialog = false }) {
          Text("Cancelar", color = TextSecondary)
        }
      }
    )
  }
}

@Composable
private fun CompetencyItemRow(comp: CompetencyScore) {
  Column(modifier = Modifier.fillMaxWidth()) {
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Text(
        text = "${comp.code} · ${comp.name}",
        fontSize = 14.sp,
        fontWeight = FontWeight.SemiBold,
        color = TextPrimary
      )

      Text(
        text = "${comp.score}",
        fontSize = 15.sp,
        fontWeight = FontWeight.Bold,
        color = TextPrimary
      )
    }

    Spacer(modifier = Modifier.height(6.dp))

    // Progress bar for competency (out of 200)
    LinearProgressIndicator(
      progress = { (comp.score.toFloat() / comp.maxScore.toFloat()).coerceIn(0f, 1f) },
      modifier = Modifier
        .fillMaxWidth()
        .height(8.dp)
        .clip(RoundedCornerShape(4.dp)),
      color = if (comp.isAttention) Color(0xFF9E0043) else PinkPrimary,
      trackColor = Color(0xFFF3F4F6),
      strokeCap = StrokeCap.Round
    )
  }
}
